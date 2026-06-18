import { findDiagnosisType, type DiagnosisType, type Warning } from "@/data/diagnosisTypes";
import { findRescueRule } from "@/data/rescueRules";

export type Answers = {
  formFactor: string;
  purposes: string[];
  mobility: string;
  budget: string;
  os: string;
  lifespan: string;
  condition: string;
};

export type DiagnosisResult = {
  type: DiagnosisType;
  warnings: Warning[];
  debug: string[];
};

const heavyPurposes = new Set(["video", "game", "program"]);

function uniqueWarnings(warnings: Warning[]) {
  const seen = new Set<string>();
  return warnings
    .sort((a, b) => b.priority - a.priority)
    .filter((w) => {
      if (seen.has(w.id)) return false;
      seen.add(w.id);
      return true;
    })
    .slice(0, 2);
}

function decideNormalType(answers: Answers, debug: string[]) {
  const purposes = answers.purposes || [];

  const desktopSelected = answers.formFactor === "desktop";
  const canUseDesktop = desktopSelected && answers.mobility !== "daily";
  const heavyForDesktop = purposes.some((p) => ["video", "game", "program"].includes(p));

  // Q0でデスクトップを選んだ場合は、持ち運び前提でない限りノート向けタイプへ流さない。
  if (canUseDesktop) {
    if (heavyForDesktop && (answers.budget === "high" || answers.budget === "premium")) {
      debug.push("desktop_heavy_branch");
      return "type_17_desktop_creator_gaming";
    }

    debug.push("desktop_home_branch");
    return "type_16_desktop_home";
  }

  if (purposes.includes("fx")) {
    debug.push("fx_priority");
    return "type_07_fx_mt4_windows";
  }

  if (purposes.includes("game")) {
    debug.push("game_branch");
    return answers.budget === "premium" || answers.budget === "high" ? "type_10_gaming" : "type_12_greedy_budget_gap";
  }

  if (purposes.includes("video")) {
    debug.push("video_branch");
    return answers.budget === "premium" ? "type_05_creator_pro" : "type_04_video_entry";
  }

  if (purposes.includes("program")) {
    debug.push("program_branch");
    return "type_06_programming_dev";
  }

  if (purposes.includes("ai_sns")) {
    debug.push("ai_sns_branch");
    return "type_03_chatgpt_canva_sns";
  }

  if (purposes.includes("blog")) {
    debug.push("blog_branch");
    return "type_02_side_hustle_windows";
  }

  if (answers.mobility === "daily") {
    debug.push("mobile_branch");
    return "type_08_mobile_light";
  }

  if (answers.mobility === "home") {
    debug.push("home_branch");
    return "type_09_home_cost";
  }

  debug.push("basic_fallback");
  return "type_01_basic_light";
}

export function diagnose(answers: Answers): DiagnosisResult {
  const purposes = answers.purposes || [];
  const debug: string[] = [];
  const extraWarnings: Warning[] = [];
  const isLow = answers.budget === "very_low" || answers.budget === "low";
  const isVeryLow = answers.budget === "very_low";

  const rescueRule = findRescueRule(answers);
  let typeId = rescueRule?.resultTypeId ?? decideNormalType(answers, debug);

  if (rescueRule) {
    debug.push(`rescue:${rescueRule.id}`);
  }

  // デスクトップ希望の場合、5万円以下の購入停止タイプ以外はノートPC提案に寄りすぎないよう補正する。
  if (answers.formFactor === "desktop" && answers.mobility !== "daily" && typeId !== "type_15_stop_buying_rescue") {
    const wantsHeavy = purposes.some((p) => ["video", "game", "program"].includes(p));
    if (wantsHeavy && (answers.budget === "high" || answers.budget === "premium")) {
      typeId = "type_17_desktop_creator_gaming";
      debug.push("desktop_override:heavy");
    } else if (["type_02_side_hustle_windows", "type_03_chatgpt_canva_sns", "type_04_video_entry", "type_06_programming_dev", "type_09_home_cost", "type_11_low_budget_creative", "type_12_greedy_budget_gap", "type_14_used_dev_rescue"].includes(typeId)) {
      typeId = "type_16_desktop_home";
      debug.push("desktop_override:home");
    }
  }

  // Mac希望は最優先。ユーザーがMacを選んだら、基本的にWindows診断結果へ落とさない。
  // 例外用途（FX/MT4・ゲーム）も、Windows推奨へ強制せず「Mac希望・用途注意型」に着地させる。
  if (answers.os === "mac" && typeId !== "type_15_stop_buying_rescue") {
    if (answers.formFactor === "desktop" && answers.mobility !== "daily") {
      typeId = "type_20_mac_desktop";
      debug.push("mac_absolute_override:desktop");
    } else if (purposes.includes("fx") || purposes.includes("game")) {
      typeId = "type_21_mac_caution";
      debug.push("mac_absolute_override:caution");
    } else if (purposes.includes("video")) {
      typeId = "type_19_mac_creator";
      debug.push("mac_absolute_override:creator");
    } else {
      typeId = "type_18_mac_air_balanced";
      debug.push("mac_absolute_override:balanced");
    }
  }

  if (answers.os === "mac" && purposes.includes("fx")) {
    extraWarnings.push({
      id: "fx_mac_warning",
      priority: 100,
      title: "MacでMT4を使うなら事前確認が必要です",
      text: "MacでもMT4を動かす方法はありますが、初心者には設定や不具合対応が難しくなりやすいです。Mac希望なら、VPS利用や対応環境を先に確認してから選ぶと安全です。",
    });
  }

  if (isVeryLow && (purposes.includes("video") || purposes.includes("game"))) {
    extraWarnings.push({
      id: "do_not_buy_now",
      priority: 110,
      title: "今すぐPCを買わない判断も正解です",
      text: "5万円以下で動画編集や本格ゲーム用PCを買うと、性能不足の地雷を踏む可能性が高いです。まずはスマホ編集や軽量ゲームで始め、7万〜12万円まで貯めてから選ぶ方が安全です。",
    });
  }

  if ((answers.lifespan === "long" || answers.lifespan === "pro") && isLow) {
    extraWarnings.push({
      id: "long_use_low_budget",
      priority: 80,
      title: "長く使うなら16GBを優先",
      text: "4〜5年使う前提なら、安さだけでメモリ8GB以下を選ぶより、少し予算を上げるか中古・整備済も候補に入れて16GBを狙う方が後悔しにくいです。",
    });
  }

  if (answers.formFactor === "desktop" && answers.mobility === "daily") {
    extraWarnings.push({
      id: "desktop_daily_mismatch",
      priority: 95,
      title: "毎日持ち運ぶならノートPC推奨です",
      text: "デスクトップPCは家で使うならコスパが高い一方、外へ持ち運ぶことはできません。学校・カフェ・職場で使う予定があるならノートPCを選ぶ方が安全です。",
    });
  }

  if (answers.mobility === "daily" && typeId === "type_09_home_cost") {
    extraWarnings.push({
      id: "daily_large_warning",
      priority: 70,
      title: "毎日持つなら軽さも大切です",
      text: "家用の大画面PCはコスパが高い一方、毎日持ち運ぶには重く感じやすいです。通勤・通学で使うなら1.2〜1.3kg前後を優先しましょう。",
    });
  }

  if (answers.condition === "no" && ["type_11_low_budget_creative", "type_14_used_dev_rescue"].includes(typeId)) {
    extraWarnings.push({
      id: "new_only_low_budget",
      priority: 90,
      title: "新品だけだと選択肢がかなり狭くなります",
      text: "低予算で重い用途を狙う場合、新品だけに絞ると性能不足になりやすいです。保証がある整備済品や大手ショップの中古も検討すると現実的な候補が増えます。",
    });
  }

  const heavyCount = purposes.filter((p) => heavyPurposes.has(p)).length;
  if (heavyCount >= 2 && answers.budget === "middle" && typeId !== "type_12_greedy_budget_gap") {
    extraWarnings.push({
      id: "multi_heavy_middle_budget",
      priority: 75,
      title: "重い用途は優先順位を決めると安全です",
      text: "動画編集・ゲーム・開発を全部快適にするには予算が膨らみやすいです。最初は一番使う用途を軸に選ぶと、買い物の失敗を減らせます。",
    });
  }

  const type = findDiagnosisType(typeId);
  const warnings = uniqueWarnings([...type.warnings, ...extraWarnings]);
  return { type, warnings, debug };
}

export function emptyAnswers(): Answers {
  return { formFactor: "", purposes: [], mobility: "", budget: "", os: "", lifespan: "", condition: "" };
}

export function isComplete(answers: Answers) {
  return Boolean(answers.formFactor) && answers.purposes.length > 0 && Boolean(answers.mobility && answers.budget && answers.os && answers.lifespan && answers.condition);
}
