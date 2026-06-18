import type { Answers } from "@/lib/diagnose";

export type RescueRule = {
  id: string;
  resultTypeId: string;
  priority: number;
  reason: string;
  matches: (answers: Answers) => boolean;
};

const has = (answers: Answers, purpose: string) => answers.purposes.includes(purpose);
const isVeryLow = (answers: Answers) => answers.budget === "very_low";
const isLow = (answers: Answers) => answers.budget === "very_low" || answers.budget === "low";
const isMiddleOrLow = (answers: Answers) => answers.budget === "very_low" || answers.budget === "low" || answers.budget === "middle";

export const rescueRules: RescueRule[] = [
  {
    id: "very_low_video_game_stop",
    resultTypeId: "type_15_stop_buying_rescue",
    priority: 120,
    reason: "5万円以下で動画編集/ゲーム希望は地雷購入リスクが高いため、今買わない救済ルートへ誘導",
    matches: (answers) => isVeryLow(answers) && (has(answers, "video") || has(answers, "game")),
  },
  {
    id: "low_budget_video_rescue",
    resultTypeId: "type_11_low_budget_creative",
    priority: 100,
    reason: "低予算と動画編集希望が矛盾しているため、中古・整備済の限界突破ルートへ誘導",
    matches: (answers) => isLow(answers) && has(answers, "video"),
  },
  {
    id: "low_budget_game_rescue",
    resultTypeId: "type_13_cloud_gaming_rescue",
    priority: 98,
    reason: "低予算と本格PCゲーム希望が矛盾しているため、軽量ゲーム/クラウド前提へ誘導",
    matches: (answers) => isLow(answers) && has(answers, "game"),
  },
  {
    id: "very_low_budget_dev_rescue",
    resultTypeId: "type_14_used_dev_rescue",
    priority: 96,
    reason: "低予算で開発希望のため、中古・軽量開発ルートへ誘導",
    matches: (answers) => isLow(answers) && has(answers, "program"),
  },
  {
    id: "greedy_budget_gap",
    resultTypeId: "type_12_greedy_budget_gap",
    priority: 90,
    reason: "重い用途が複数あり、予算が不足しやすいため、優先順位を決めるルートへ誘導",
    matches: (answers) => {
      const heavyCount = answers.purposes.filter((p) => ["video", "game", "program"].includes(p)).length;
      return heavyCount >= 2 && isMiddleOrLow(answers);
    },
  },
];

export function findRescueRule(answers: Answers) {
  return rescueRules
    .filter((rule) => rule.matches(answers))
    .sort((a, b) => b.priority - a.priority)[0];
}
