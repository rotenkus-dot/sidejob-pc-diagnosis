import { affiliateQueries } from "./affiliateQueries";

export type Platform = "rakuten" | "amazon" | "yahoo" | "kakaku";
export interface Warning { id: string; priority: number; title: string; text: string; }
export interface SearchLink { label: string; query: string; platform: Platform; }
export interface CrossSell { category: string; title: string; reason: string; query?: string; platform?: Platform; }
export interface DiagnosisType {
  id: string; priority: number; title: string; catch_copy: string; description: string;
  ideal_summary: string; realistic_summary: string;
  conditions: { recommend: string[]; avoid: string[] };
  warnings: Warning[]; action: { title: string; text: string };
  search_links: SearchLink[]; cross_sell: CrossSell[]; related_articles: string[];
}

const commonAction = "検索結果に飛んだ後は、価格だけで決めないでください。初心者の最初の1台は、Lenovo、HP、DELL、ASUS、Acer、NEC、富士通、Appleなど、サポート情報やレビューが見つけやすいメーカーを優先すると安全です。1万〜3万円台の激安新品PCは、スペック表だけ見ると魅力的でも、処理性能・サポート・耐久性で不安が残る場合があります。";

export const diagnosisTypes: DiagnosisType[] = [
  {
    id: "type_01_basic_light", priority: 20, title: "とにかく安くネット・動画視聴用", catch_copy: "安さ重視。ただしメモリ4GBとHDDだけは避けましょう。",
    description: "YouTube、ネット検索、買い物、メール、軽い資料確認が中心の人向けです。重い作業をしないなら高額PCは不要ですが、安すぎる新品には注意が必要です。",
    ideal_summary: "ネット中心なら8GBメモリとSSD搭載で十分です。", realistic_summary: "5万〜7万円前後なら、新品Windows 11の8GB/SSDモデルを狙うのが安全です。",
    conditions: { recommend: ["Windows 11搭載", "メモリ8GB以上", "SSD 256GB以上", "大手メーカーまたはレビューが多いモデル"], avoid: ["メモリ4GB", "HDD搭載", "Celeronでも極端に古いモデル", "2万円台の激安新品ノート"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: commonAction },
    search_links: [{ label: "楽天市場で安めの新品PCを探す", query: affiliateQueries.windowsNewBasic, platform: "rakuten" }, { label: "Amazonで安めの新品PCを探す", query: affiliateQueries.windowsNewBasic, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "ワイヤレスマウス", reason: "安いPCでも操作性を上げると快適さが大きく変わります。", query: "ワイヤレスマウス 静音" }],
    related_articles: ["5万円台ノートPCで失敗しない最低条件", "メモリ4GBのPCを避けた方がいい理由"]
  },
  {
    id: "type_02_side_hustle_windows", priority: 50, title: "副業・ブログ用 地雷回避Windows型", catch_copy: "初心者が一番失敗しにくい王道ライン。Windows11・16GB・512GBを守りましょう。",
    description: "Word、Excel、ブログ執筆、WordPress、ChatGPT活用に向いた構成です。副業の最初の1台として、価格と快適さのバランスが良いタイプです。",
    ideal_summary: "副業・事務作業を快適にこなせる王道スペックです。", realistic_summary: "7万〜12万円の予算で、最もコスパ良く新品を狙えるラインです。",
    conditions: { recommend: ["Windows 11搭載", "メモリ16GB以上", "SSD512GB以上", "Ryzen 5 7000番台以降、またはCore i5 第12世代以降"], avoid: ["メモリ8GB以下で長期使用", "SSD256GB以下", "Celeron / Pentium / 古いCore i3", "1万〜3万円台の激安新品"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: commonAction },
    search_links: [{ label: "楽天市場で王道Windows新品を探す", query: affiliateQueries.windowsNewRyzen, platform: "rakuten" }, { label: "Amazonで王道Windows新品を探す", query: affiliateQueries.windowsNewBalanced, platform: "amazon" }, { label: "Yahoo!で王道Windows新品を探す", query: affiliateQueries.windowsNewBalanced, platform: "yahoo" }],
    cross_sell: [{ category: "周辺機器", title: "ワイヤレスマウス", reason: "副業作業の効率が上がります。", query: "ロジクール ワイヤレスマウス" }, { category: "副業ツール", title: "レンタルサーバー", reason: "ブログ副業を始めるなら次の導線にしやすい高単価案件です。" }],
    related_articles: ["副業ブログ用PCにメモリ16GBが必要な理由", "10万円以下で失敗しないWindowsノートPCの選び方"]
  },
  {
    id: "type_03_chatgpt_canva_sns", priority: 55, title: "ChatGPT・Canva・SNS副業用", catch_copy: "軽さと16GBメモリを優先。作業の詰まりを減らす副業向け構成です。",
    description: "ChatGPT、Canva、Instagram運用、X運用、ブログ、軽いショート動画づくりに向いています。重いゲーミングPCより、軽くて長時間作業しやすいPCを選ぶ方が満足度が高いです。",
    ideal_summary: "副業ツールを複数開いても重くなりにくい16GBが安心です。", realistic_summary: "Windowsなら7万〜12万円、Macなら中古・整備済のM1/M2も候補です。",
    conditions: { recommend: ["メモリ16GB以上", "SSD512GB以上", "13〜14インチ軽量モデル", "iPhoneユーザーならMacも候補"], avoid: ["安さだけで8GBを選ぶ", "画面が小さすぎる中古", "バッテリー状態が不明な中古", "重すぎる15.6インチを毎日持ち運ぶ"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: commonAction },
    search_links: [{ label: "楽天市場で軽量16GBノートを探す", query: affiliateQueries.windowsNewBalanced, platform: "rakuten" }, { label: "Amazonで軽量16GBノートを探す", query: affiliateQueries.windowsNewBalanced, platform: "amazon" }, { label: "MacBook Air M1中古も見る", query: affiliateQueries.macM1Better, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "ノートPCスタンド", reason: "SNS運用やライティングの長時間作業で姿勢が楽になります。", query: "ノートPCスタンド" }, { category: "副業ツール", title: "Canva Pro", reason: "SNS画像や提案資料の作成導線に自然につながります。" }],
    related_articles: ["ChatGPT副業に必要なPCスペック", "Canva用PCは高性能じゃなくてもいい？"]
  },
  {
    id: "type_04_video_entry", priority: 65, title: "動画編集入門用", catch_copy: "メモリ16GB以上と容量が命。安すぎるPCは編集で止まりやすいです。",
    description: "CapCut、YouTube、ショート動画、軽いPremiere Proに挑戦したい人向けです。本格4K編集までは狙わず、まず副業の入口として現実的に始める構成です。",
    ideal_summary: "動画編集入門なら16GB/512GB以上が安心ラインです。", realistic_summary: "10万〜18万円なら、新品Windows上位モデルか中古MacBook Air M1/M2が現実的です。",
    conditions: { recommend: ["メモリ16GB以上", "SSD512GB以上", "Ryzen 7 / Core i7 / Apple M1以上", "外付けSSDも検討"], avoid: ["メモリ8GB", "SSD256GB", "古すぎる中古PC", "本格編集なのに10万円以下だけで探す"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: commonAction },
    search_links: [{ label: "楽天市場で動画編集入門PCを探す", query: affiliateQueries.creatorEntry, platform: "rakuten" }, { label: "Amazonで動画編集入門PCを探す", query: affiliateQueries.creatorEntry, platform: "amazon" }, { label: "MacBook Air M1中古を見る", query: affiliateQueries.macM1Better, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "外付けSSD 1TB", reason: "動画素材は容量を使うので、後から必ず欲しくなりやすいです。", query: "外付けSSD 1TB" }, { category: "副業ツール", title: "動画編集ソフト", reason: "最初は無料〜低価格ツールから始めると初期費用を抑えられます。" }],
    related_articles: ["動画編集副業に必要なPCスペック", "10万円台で動画編集PCを選ぶ現実ライン"]
  },
  {
    id: "type_05_creator_pro", priority: 80, title: "本格動画編集・クリエイター用", catch_copy: "案件用なら妥協しすぎ注意。32GBとGPU/上位Macを検討しましょう。",
    description: "Premiere Pro、DaVinci Resolve、4K編集、案件用の制作を想定したタイプです。単価の高い作業をするなら、PC代をケチりすぎると作業時間で損します。",
    ideal_summary: "本格編集なら20万円以上を仕事道具として考えるのが安全です。", realistic_summary: "WindowsならRTX搭載、MacならMacBook Pro/M系上位が候補です。",
    conditions: { recommend: ["メモリ32GB推奨", "SSD1TB推奨", "RTX系GPUまたはMacBook Pro系", "外付けSSDと外部モニター"], avoid: ["10万円以下で本格編集", "メモリ16GB未満", "GPUなしWindowsで重い編集", "容量不足のPC"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: commonAction },
    search_links: [{ label: "楽天市場でクリエイターPCを探す", query: affiliateQueries.creatorPro, platform: "rakuten" }, { label: "AmazonでクリエイターPCを探す", query: affiliateQueries.creatorPro, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "外付けSSD 2TB", reason: "4K素材や案件データの保存に必須級です。", query: "外付けSSD 2TB" }, { category: "周辺機器", title: "外部モニター", reason: "編集作業の効率が大きく上がります。", query: "27インチ モニター 4K" }],
    related_articles: ["動画編集案件用PCの最低予算", "Premiere Pro用PCで妥協してはいけないポイント"]
  },
  {
    id: "type_06_programming_dev", priority: 60, title: "プログラミング・アプリ開発用", catch_copy: "開発はメモリが正義。16GB以上、余裕があれば32GBです。",
    description: "Web制作、アプリ開発、VS Code、Claude Code、軽めのDocker利用に向いたタイプです。開発環境を複数立ち上げるならメモリを優先しましょう。",
    ideal_summary: "開発用途は16GB/512GB以上が最低安心ラインです。", realistic_summary: "MacBook Air M1/M2 16GBまたはWindows Ryzen 5以上が扱いやすいです。",
    conditions: { recommend: ["メモリ16GB以上", "SSD512GB以上", "画面は13〜14インチ以上", "長く使うなら32GBも候補"], avoid: ["メモリ8GBで開発環境を複数起動", "SSD256GB", "激安中古Windows", "画面が狭すぎるPC"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: commonAction },
    search_links: [{ label: "楽天市場で開発向けWindowsを探す", query: affiliateQueries.windowsNewBalanced, platform: "rakuten" }, { label: "MacBook Air 16GBを探す", query: affiliateQueries.macM1Better, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "外部モニター", reason: "コードを書くなら画面の広さは作業効率に直結します。", query: "24インチ モニター" }, { category: "周辺機器", title: "外付けキーボード", reason: "長時間コーディングの疲れを減らせます。", query: "キーボード 静音" }],
    related_articles: ["プログラミング用PCはMacとWindowsどっち？", "Claude Codeを使う副業PCの選び方"]
  },
  {
    id: "type_07_fx_mt4_windows", priority: 70, title: "FX・MT4・自動売買用 Windows安定型", catch_copy: "MT4/EA運用はWindows推奨。派手な性能より安定性を優先しましょう。",
    description: "MT4、EA、自動売買、チャート表示、バックテストの入口に向いたタイプです。Macでも動かす方法はありますが、初心者にはWindowsの方が設定でつまずきにくいです。",
    ideal_summary: "FX・MT4用途はWindows、SSD、メモリ8〜16GBが安全です。", realistic_summary: "ローカル運用なら新品/中古Windows、長時間稼働ならVPSも候補です。",
    conditions: { recommend: ["Windows 11搭載", "メモリ8GB以上、できれば16GB", "SSD256GB以上、できれば512GB", "発熱と電源の安定性"], avoid: ["MacだけでMT4運用しようとする", "メモリ4GB", "HDD搭載", "電源や発熱が不安な激安中古"] },
    warnings: [{ id: "fx_mac_warning", priority: 100, title: "MT4メインならWindows推奨です", text: "MacでもMT4を動かす方法はありますが、初心者には設定や不具合対応が難しくなりやすいです。EA運用やバックテストを重視するならWindowsを選ぶとつまずきにくくなります。" }],
    action: { title: "ECサイトで選ぶときのコツ", text: "MT4用途は高級GPUより、Windows・SSD・メモリ・安定性を優先してください。長時間稼働させるなら、PC本体だけでなくVPS運用も比較すると安全です。" },
    search_links: [{ label: "楽天市場でMT4向けWindowsを探す", query: affiliateQueries.windowsNewBalanced, platform: "rakuten" }, { label: "AmazonでMT4向けWindowsを探す", query: affiliateQueries.windowsNewBalanced, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "外部モニター", reason: "複数チャートを見やすくできます。", query: "24インチ モニター" }, { category: "副業ツール", title: "VPS", reason: "EAの長時間稼働ではローカルPCより安定しやすい選択肢です。" }],
    related_articles: ["MT4用PCはMacよりWindowsが安全な理由", "EA自動売買に必要なPCスペック"]
  },
  {
    id: "type_08_mobile_light", priority: 52, title: "持ち運び最優先 軽量ノート型", catch_copy: "毎日持つなら軽さは正義。1.2kg前後を狙いましょう。",
    description: "学校、カフェ、職場、出張で毎日持ち運ぶ人向けです。性能だけでなく重量・バッテリー・ACアダプターの軽さも重要です。",
    ideal_summary: "13〜14インチ、1.2kg前後、16GBメモリが快適です。", realistic_summary: "10万〜18万円の軽量16GBモデルが後悔しにくいラインです。",
    conditions: { recommend: ["1.2kg前後まで", "13〜14インチ", "メモリ16GB推奨", "バッテリー持ち重視"], avoid: ["15.6インチ以上の重いPC", "安いけど1.8kg以上", "バッテリー劣化が激しい中古", "ACアダプターが重いモデル"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: commonAction },
    search_links: [{ label: "楽天市場で軽量ノートを探す", query: affiliateQueries.windowsNewBalanced, platform: "rakuten" }, { label: "Amazonで軽量ノートを探す", query: affiliateQueries.windowsNewBalanced, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "薄型PCケース", reason: "毎日持ち運ぶなら傷防止に役立ちます。", query: "ノートパソコン ケース 14インチ" }],
    related_articles: ["毎日持ち運ぶPCは何kgまでが現実的？", "軽量ノートPCで後悔しない選び方"]
  },
  {
    id: "type_09_home_cost", priority: 45, title: "家用コスパ重視 大画面型", catch_copy: "家で使うなら軽さより画面サイズ。15.6インチはコスパが強いです。",
    description: "ほぼ家で使う人向けです。軽量モデルにこだわらない分、同じ予算で画面が大きく、性能の高いPCを選びやすくなります。",
    ideal_summary: "15.6〜16インチ、16GB/512GBが家用の王道です。", realistic_summary: "7万〜12万円でかなり使いやすい新品Windowsを狙えます。",
    conditions: { recommend: ["15.6〜16インチ", "メモリ16GB", "SSD512GB", "重量より価格と画面サイズ優先"], avoid: ["軽量モデルにこだわって高くなる", "メモリ8GB", "HDD搭載", "画面が小さい中古PC"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: commonAction },
    search_links: [{ label: "楽天市場で家用大画面PCを探す", query: affiliateQueries.windowsNewBalanced, platform: "rakuten" }, { label: "Amazonで家用大画面PCを探す", query: affiliateQueries.windowsNewBalanced, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "ワイヤレスキーボード・マウス", reason: "家用なら作業姿勢を整えると快適です。", query: "ワイヤレスキーボード マウス セット" }],
    related_articles: ["家で使うPCは軽さより画面サイズを優先すべき理由", "15.6インチノートPCのメリット・デメリット"]
  },
  {
    id: "type_10_gaming", priority: 78, title: "ゲームもしたい ゲーミング型", catch_copy: "重いゲームはGPU必須。普通のノートPCで無理をしないでください。",
    description: "APEX、Fortnite、Minecraft、Steamなどを快適に遊びたい人向けです。重いゲームをするなら、普通のノートPCではなくゲーミングPCを選ぶ必要があります。",
    ideal_summary: "RTX系GPU、16GBメモリ、512GB SSDが最低安心ラインです。", realistic_summary: "15万〜25万円を見ておくと失敗しにくいです。",
    conditions: { recommend: ["RTX系GPU搭載", "メモリ16GB以上", "SSD512GB以上", "冷却性能のレビュー確認"], avoid: ["普通のノートPCで重いゲーム", "GPUなしPC", "メモリ8GB", "薄型軽量だけを重視する"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: "ゲーミングPCはGPU名を必ず確認してください。『ゲーミング風』の見た目だけで、GPU非搭載のモデルを選ばないようにしましょう。" },
    search_links: [{ label: "楽天市場でゲーミングノートを探す", query: affiliateQueries.gamingSafe, platform: "rakuten" }, { label: "Amazonでゲーミングノートを探す", query: affiliateQueries.gamingSafe, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "ゲーミングマウス", reason: "ゲームの操作性が上がります。", query: "ゲーミングマウス" }, { category: "周辺機器", title: "冷却台", reason: "ゲーミングノートは熱対策が重要です。", query: "ノートPC 冷却台" }],
    related_articles: ["ゲーミングPCと普通のPCの違い", "APEX用ノートPCの最低スペック"]
  },
  {
    id: "type_11_low_budget_creative", priority: 90, title: "低予算クリエイティブ限界突破タイプ", catch_copy: "安い新品より、実績ある中古・整備済を狙う方が安全です。",
    description: "動画編集やクリエイティブ作業に挑戦したいけれど、初期費用を抑えたい人向けの救済プランです。スペックの低い新品激安PCより、実績ある中古・整備済モデルを狙う方が満足度が高くなりやすいです。",
    ideal_summary: "本来、動画編集は10万〜12万円以上のPCが安心ラインです。", realistic_summary: "予算7万円以下なら、中古のMacBook Air M1かWindowsの16GB中古が現実的です。",
    conditions: { recommend: ["中古・整備済品も候補", "MacBook Air M1", "WindowsならCore i5 第10世代以降またはRyzen 5 5000番台以降・メモリ16GB以上", "SSD512GB以上", "WindowsならWindows11対応を明記"], avoid: ["メモリ4GB/8GB固定の新品激安PC", "Celeron / Pentium / Core i5 第7世代以前", "HDD搭載", "バッテリー状態が不明な中古"] },
    warnings: [{ id: "budget_creative_gap", priority: 100, title: "予算とやりたいことに差があります", text: "動画編集やクリエイティブ作業は、本来10万円以上のPCが安心ラインです。今の予算なら、新品の安さより中古・整備済の実績あるモデルを優先すると、買い直しのリスクを防げます。" }],
    action: { title: "ECサイトで選ぶときのコツ", text: "中古を狙う場合は、保証・返品条件・バッテリー状態・Windows11対応の明記・ショップ評価を必ず確認してください。迷う場合は、レビューが多い大手ショップや整備済品から選ぶ方が安全です。" },
    search_links: [{ label: "楽天市場で中古Windows 16GBを探す", query: affiliateQueries.windowsUsedSafe, platform: "rakuten" }, { label: "AmazonでMacBook Air M1中古を探す", query: affiliateQueries.macM1Cheap, platform: "amazon" }, { label: "Yahoo!でMacBook Air M1中古を探す", query: affiliateQueries.macM1Cheap, platform: "yahoo" }],
    cross_sell: [{ category: "周辺機器", title: "外付けSSD 1TB", reason: "動画素材は容量を激しく消費します。", query: "外付けSSD 1TB" }, { category: "周辺機器", title: "ノートPCスタンド", reason: "長時間の副業作業が楽になります。", query: "ノートPCスタンド" }],
    related_articles: ["5万円台で動画編集用PCを探す現実ライン", "MacBook Air M1は今から副業用にあり？"]
  },
  {
    id: "type_12_greedy_budget_gap", priority: 85, title: "欲張り全部入り・予算調整タイプ", catch_copy: "すべてを1台でこなすには予算不足。まず最優先の1つに絞りましょう。",
    description: "動画編集、ゲーム、プログラミングなど重い作業を複数やりたい一方で、予算が限られている状態です。今の予算で全部入りを狙うと中途半端になりやすいです。",
    ideal_summary: "ゲームも動画編集も開発も快適に行うには、本来15万〜20万円以上が必要です。", realistic_summary: "7万〜12万円なら、副業用16GB新品か動画優先のM1 Mac中古など、目的を絞るのが安全です。",
    conditions: { recommend: ["一番やりたい目的を1つに絞る", "副業・ブログ優先なら16GB新品Windows", "動画編集優先ならMacBook Air M1中古", "ゲーム優先なら15万円以上まで貯める"], avoid: ["全部できると書かれた激安PC", "GPUなしで重い3Dゲーム", "メモリ8GBで長期使用", "安すぎるゲーミング風PC"] },
    warnings: [{ id: "greedy_budget_gap", priority: 95, title: "やりたいことに対して予算が少し足りません", text: "今の予算で全部を叶えようとすると、中途半端なスペックになり後悔しやすいです。まずは最も優先度の高い用途に合わせて選ぶのがおすすめです。" }],
    action: { title: "ECサイトで選ぶときのコツ", text: "あれもこれもと欲張らず、まずは『新品のRyzen 5 / 16GB / 512GB / Windows11』という手堅いベース条件から探すと失敗を減らせます。" },
    search_links: [{ label: "楽天市場で手堅いWindows新品を探す", query: affiliateQueries.windowsNewRyzen, platform: "rakuten" }, { label: "Amazonで手堅いWindows新品を探す", query: affiliateQueries.windowsNewBalanced, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "ノートPCスタンド", reason: "どの副業でも長時間作業の負担を減らせます。", query: "ノートPCスタンド" }],
    related_articles: ["動画編集とゲームを両立するPCの最低予算", "副業初心者が最初に揃えるべきデスク環境"]
  }
  ,
  {
    id: "type_13_cloud_gaming_rescue", priority: 88, title: "PCゲームはクラウド/軽量ゲーム割り切りタイプ", catch_copy: "7万円以下で本格ゲーミングノートは危険。軽量ゲームかクラウド前提に逃がしましょう。",
    description: "予算7万円以下で本格ゲーミングノートを狙うと、古いGPU・劣化バッテリー・発熱の強い中古品を掴むリスクが高くなります。この予算では、重い3Dゲームを無理に狙わず、軽量ゲーム・ブラウザゲーム・クラウドゲーム・家庭用ゲーム機との併用を前提にする方が失敗しにくいです。",
    ideal_summary: "本格PCゲームはRTX搭載で15万円以上が安心ラインです。", realistic_summary: "7万円以下なら、普段使い用Windows 16GBを買い、ゲームは軽量/クラウド前提にするのが安全です。",
    conditions: { recommend: ["Windows11搭載", "メモリ16GB", "SSD512GB", "軽量ゲーム・クラウドゲーム前提", "ゲーム優先なら予算15万円以上まで待つ"], avoid: ["古いGPU搭載の激安中古ゲーミングノート", "GPU非搭載なのにゲーミング風を名乗るPC", "発熱・バッテリー劣化が強い中古", "メモリ8GBで重い3Dゲーム目的"] },
    warnings: [{ id: "low_budget_gaming_gap", priority: 100, title: "本格ゲーム用途には予算が足りません", text: "7万円以下で本格ゲーミングノートを狙うと、古いGPUや発熱の強い中古を掴みやすくなります。まずは普段使いに強い16GBノートを選び、ゲームは軽量タイトルやクラウド前提にする方が安全です。" }],
    action: { title: "ECサイトで選ぶときのコツ", text: "このタイプでは『ゲーミング』という言葉より、Windows11・メモリ16GB・SSD512GB・保証の有無を優先してください。本格ゲームを快適に遊びたいなら、RTX搭載モデルを買える予算まで待つのが安全です。" },
    search_links: [{ label: "楽天市場で普段使い用16GBノートを探す", query: affiliateQueries.cloudGaming, platform: "rakuten" }, { label: "Amazonで普段使い用16GBノートを探す", query: affiliateQueries.cloudGaming, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "ゲームパッド", reason: "軽量ゲームやクラウドゲームでも操作性を上げられます。", query: "ゲームパッド PC" }, { category: "周辺機器", title: "ゲーミングマウス", reason: "PC本体を高くしなくても操作性だけ先に改善できます。", query: "ゲーミングマウス" }],
    related_articles: ["7万円以下でゲーミングノートを買うのが危険な理由", "クラウドゲーム用PCに必要なスペック"]
  },
  {
    id: "type_14_used_dev_rescue", priority: 86, title: "まずは中古・軽量開発タイプ", catch_copy: "開発は小さく始めてOK。最初は中古M1かWindows11対応16GB中古が現実的です。",
    description: "プログラミングやAI活用を始めたいけれど予算を抑えたい人向けです。本格AI開発や重いDocker環境には高性能PCが必要ですが、HTML/CSS/JavaScript、Next.js学習、軽いWeb制作なら中古・整備済PCでも十分スタートできます。",
    ideal_summary: "開発用途はメモリ16GB以上・SSD512GB以上が安心です。", realistic_summary: "予算7万円以下なら、中古MacBook Air M1かWindows11対応の第10世代以降Core i5/16GB中古が現実的です。",
    conditions: { recommend: ["MacならMacBook Air M1以上", "WindowsならCore i5 第10世代以降", "メモリ16GB推奨", "SSD256GB以上、できれば512GB", "外部モニター追加も検討"], avoid: ["Windows10のまま販売されている中古", "Core i5 第7世代以前", "メモリ4GB/8GB固定", "HDD搭載", "CPU世代が不明な激安中古"] },
    warnings: [{ id: "low_budget_dev_gap", priority: 90, title: "本格開発には余裕が少ない予算です", text: "AI開発や重いアプリ開発を本格的にやるなら16GB以上が安心です。まずは中古・整備済で小さく始め、収益化や継続の見込みが出てから上位機へ買い替える方が安全です。" }],
    action: { title: "ECサイトで選ぶときのコツ", text: "中古開発PCは、Windows11対応・CPU世代・メモリ容量・SSD容量が明記されているものを優先してください。『爆速』などの曖昧な表現だけで、CPU世代が不明な商品は避けましょう。" },
    search_links: [{ label: "楽天市場で安全寄りの中古Windows開発PCを探す", query: affiliateQueries.programmingUsed, platform: "rakuten" }, { label: "AmazonでMacBook Air M1中古を探す", query: affiliateQueries.macM1Cheap, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "外部モニター", reason: "コードを書く画面が広がり、学習効率が上がります。", query: "24インチ モニター" }, { category: "副業ツール", title: "レンタルサーバー", reason: "Web制作やブログ案件への導線にできます。" }],
    related_articles: ["5万円台でプログラミング用PCを探す現実ライン", "中古PCでNext.js学習を始めても大丈夫？"]
  }
  ,
  {
    id: "type_15_stop_buying_rescue", priority: 99, title: "5万円以下の地雷確定回避タイプ", catch_copy: "今すぐPCを買わない判断も、立派な地雷回避です。",
    description: "予算5万円以下で動画編集や本格ゲームを始めたい人向けの緊急停止ルートです。この予算で新品PCを急いで買うと、メモリ不足・古いCPU・HDD・保証不安の地雷を踏みやすくなります。まずはスマホでできる作業や軽量ゲームで始め、PC予算を7万〜12万円まで育てる方が安全です。",
    ideal_summary: "動画編集やゲーム用PCは、本来10万〜15万円以上が安心ラインです。", realistic_summary: "5万円以下なら、今は買わずにスマホ活用・学習・小さな副業準備へ逃がすのが最も安全です。",
    conditions: { recommend: ["今すぐ激安PCを買わない", "スマホのCapCutやCanvaでまず練習", "PCを買うなら最低でも7万〜12万円まで貯める", "どうしても買うなら保証付き中古・整備済を慎重に確認"], avoid: ["2万〜5万円台の新品クリエイター向けPC", "GPUなしで重い3Dゲーム目的", "メモリ4GB/8GB固定の激安Windows", "HDD搭載・CPU世代不明・Office付きだけを強調する中古"] },
    warnings: [{ id: "very_low_stop", priority: 120, title: "この予算で買うと地雷率が高いです", text: "5万円以下で動画編集や本格ゲームを目的にPCを買うと、すぐ重くなって買い直しになる可能性があります。まずはスマホ編集・無料ツール・学習に寄せて、PC本体は予算を育ててから選ぶ方が安全です。" }],
    action: { title: "今やるべき現実的な逃げ道", text: "今すぐPCを買うより、スマホでCapCut編集を練習する、クラウドソーシングで案件を調べる、必要な周辺小物だけ先に揃える、という順番が安全です。PCを買う場合は、最低でもWindows11対応・16GB・SSD・CPU世代明記を守ってください。" },
    search_links: [{ label: "【最低ライン確認】中古Windows 16GBを探す", query: affiliateQueries.windowsUsedSafe, platform: "rakuten" }, { label: "【予算を上げた時用】MacBook Air M1中古を探す", query: affiliateQueries.macM1Cheap, platform: "amazon" }],
    cross_sell: [{ category: "スマホ活用", title: "スマホ動画撮影セット", reason: "PCを買う前に、スマホで撮影・編集の練習を始められます。", query: affiliateQueries.smartphoneVideoKit }, { category: "学習", title: "CapCut入門本", reason: "まずは編集の基礎を学ぶ方が、低スペックPCを焦って買うより安全です。", query: affiliateQueries.capcutBook }],
    related_articles: ["5万円以下で動画編集PCを買ってはいけない理由", "PCを買う前にスマホで始める動画編集副業", "激安PCより先に揃えるべきもの"]
  }


,

  {
    id: "type_18_mac_air_balanced", priority: 72, title: "MacBook Air バランス型", catch_copy: "Macを選ぶなら、M1/M2/M3のMacBook Airが王道です。",
    description: "Mac希望の人向けです。ブログ、ChatGPT、Canva、SNS運用、プログラミング入門、軽い動画編集まで幅広く使えます。iPhone連携や持ち運びやすさを重視するなら、Windowsより満足度が高くなりやすいです。",
    ideal_summary: "MacならM1以降、長く使うなら16GBメモリが安心です。", realistic_summary: "予算を抑えるなら中古M1、長く使うならM2/M3の16GBモデルが狙い目です。",
    conditions: { recommend: ["Apple M1/M2/M3以降", "長く使うならメモリ16GB推奨", "SSD512GB推奨", "iPhone連携・軽さ重視なら相性◎"], avoid: ["Intel Macを今からメインで買う", "バッテリー状態が不明な中古", "重いゲーム目的でMacを選ぶ", "MT4/EA運用メインでMacを選ぶ"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: "Macは同じ名前でもメモリ容量やSSD容量で快適さが大きく変わります。長く使うなら8GBより16GB、256GBより512GBを優先すると後悔しにくいです。中古はバッテリー状態・保証・返品条件を必ず確認してください。" },
    search_links: [{ label: "楽天市場でMacBook Air M1 16GB中古を探す", query: affiliateQueries.macM1Better, platform: "rakuten" }, { label: "AmazonでMacBook Air M2 16GBを探す", query: affiliateQueries.macAirM2, platform: "amazon" }, { label: "Yahoo!でMacBook Air M1 16GB中古を探す", query: affiliateQueries.macM1Better, platform: "yahoo" }],
    cross_sell: [{ category: "周辺機器", title: "USB-Cハブ", reason: "MacBook Airは端子が少ないため、外部モニターやUSB機器を使うなら便利です。", query: "MacBook USB-C ハブ" }, { category: "周辺機器", title: "ノートPCスタンド", reason: "持ち運び用Macでも家ではスタンドを使うと作業姿勢が楽になります。", query: "ノートPCスタンド MacBook" }],
    related_articles: ["MacBook Air M1は今から副業用にあり？", "MacBook Airは8GBと16GBどっちを選ぶべき？"]
  },
  {
    id: "type_19_mac_creator", priority: 83, title: "Mac クリエイター型", catch_copy: "動画編集やデザインをMacでやるなら、M系Macの16GB以上を優先しましょう。",
    description: "Mac希望で動画編集・画像編集・デザインをやりたい人向けです。ショート動画やSNS編集ならMacBook Airでも始められますが、案件用や4K編集まで見るならMacBook Proやメモリ多めの構成が安心です。",
    ideal_summary: "動画編集用MacはM系チップ・16GB以上・512GB以上が安心ラインです。", realistic_summary: "予算を抑えるならM1/M2 Air 16GB、中長期ならMacBook Pro系も候補です。",
    conditions: { recommend: ["Apple M1/M2/M3以降", "メモリ16GB以上", "SSD512GB以上", "本格編集ならMacBook Pro系", "外付けSSDも検討"], avoid: ["Intel Mac", "メモリ8GBで本格編集", "SSD256GBで動画素材を本体保存", "重い3Dゲーム目的でMacを選ぶ"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: "Macの動画編集用は、安さだけで8GB/256GBを選ぶと素材管理や長期使用で窮屈になりやすいです。ショート動画中心ならAir、案件・4K編集ならPro系を検討しましょう。" },
    search_links: [{ label: "楽天市場でMacBook Air M1 16GBを探す", query: affiliateQueries.macM1Better, platform: "rakuten" }, { label: "AmazonでMacBook Air M2 16GBを探す", query: affiliateQueries.macAirM2, platform: "amazon" }, { label: "AmazonでMacBook Pro系を探す", query: affiliateQueries.macBookProCreator, platform: "amazon" }],
    cross_sell: [{ category: "周辺機器", title: "外付けSSD", reason: "動画素材を本体だけに保存するとすぐ容量不足になります。", query: "MacBook 外付けSSD 1TB" }, { category: "周辺機器", title: "USB-Cハブ", reason: "SDカードや外部モニター接続に便利です。", query: "MacBook USB-C ハブ HDMI" }],
    related_articles: ["動画編集用MacはAirで足りる？", "MacBookで動画編集するなら何GB必要？"]
  },

  {
    id: "type_20_mac_desktop", priority: 74, title: "Mac mini / 据え置きMac型", catch_copy: "Mac希望で家メインなら、Mac miniという選択肢があります。",
    description: "Macを選びつつ、家で据え置き運用したい人向けです。MacBookではなく、Mac miniと外部モニターを組み合わせると、作業環境を作りやすくなります。",
    ideal_summary: "家メインのMacなら、Mac mini + モニターがコスパ良く快適です。", realistic_summary: "すでにモニター・キーボード・マウスがあるならMac miniは有力です。持っていない場合は周辺機器込みの予算で考えましょう。",
    conditions: { recommend: ["Apple M2以降", "長く使うならメモリ16GB推奨", "SSD512GB推奨", "外部モニターとセットで使う"], avoid: ["Intel Mac miniを今からメインで買う", "メモリ8GBで長期使用", "モニター等の周辺機器費用を忘れる", "重い3Dゲーム目的でMacを選ぶ"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: "Mac miniは本体価格だけを見ると魅力的ですが、モニター・キーボード・マウスが別途必要な場合があります。周辺機器を含めた総額で比較してください。" },
    search_links: [{ label: "楽天市場でMac miniを探す", query: affiliateQueries.macMini, platform: "rakuten" }, { label: "AmazonでMac miniを探す", query: affiliateQueries.macMini, platform: "amazon" }, { label: "Yahoo!でMac miniを探す", query: affiliateQueries.macMini, platform: "yahoo" }],
    cross_sell: [{ category: "周辺機器", title: "24〜27インチモニター", reason: "Mac miniは外部モニターが必要です。", query: "Mac mini モニター 27インチ" }, { category: "周辺機器", title: "キーボード・マウス", reason: "本体だけでは作業環境が完成しないため、入力機器も確認しましょう。", query: "Mac 対応 キーボード マウス" }],
    related_articles: ["Mac miniは副業用PCとしてあり？", "MacBookとMac miniどっちが向いている？"]
  },
  {
    id: "type_21_mac_caution", priority: 76, title: "Mac希望・用途注意型", catch_copy: "Mac希望は尊重。ただしゲームやMT4など、用途によっては注意が必要です。",
    description: "Macを選びたいけれど、ゲーム・MT4・一部Windows専用ソフトなど相性に注意が必要な用途が含まれている人向けです。Windowsを無理におすすめせず、Macで始める場合の注意点を先に確認します。",
    ideal_summary: "Macでできる用途と、Windowsの方が楽な用途を分けて考えるのが安全です。", realistic_summary: "Macを買うならM1以降・16GB以上を基準にしつつ、ゲームやMT4は対応方法を事前確認しましょう。",
    conditions: { recommend: ["Apple M1/M2/M3以降", "メモリ16GB推奨", "SSD512GB推奨", "使いたいアプリがMac対応か確認"], avoid: ["Windows専用ソフト目的で確認せずMacを買う", "重いPCゲーム目的でMacを買う", "MT4/EA運用をMacだけで完結すると決め打ちする", "Intel Macを今から買う"] },
    warnings: [{ id: "mac_compatibility_warning", priority: 100, title: "Macは用途によって事前確認が必要です", text: "Macは制作・副業・iPhone連携には強い一方、PCゲームやMT4/EA運用などはWindowsの方が簡単な場合があります。Macを選ぶなら、使いたいソフトがMac対応か先に確認してください。" }],
    action: { title: "ECサイトで選ぶときのコツ", text: "Mac希望なら、まずM1以降・16GB以上を基準に探してください。ゲームやMT4が目的に入る場合は、購入前に対応ソフト・代替手段・VPS利用の有無を確認すると失敗を避けやすいです。" },
    search_links: [{ label: "楽天市場でMacBook Air 16GBを探す", query: affiliateQueries.macM1Better, platform: "rakuten" }, { label: "AmazonでMacBook Air M2 16GBを探す", query: affiliateQueries.macAirM2, platform: "amazon" }, { label: "Yahoo!でMacBook Air 16GBを探す", query: affiliateQueries.macM1Better, platform: "yahoo" }],
    cross_sell: [{ category: "周辺機器", title: "USB-Cハブ", reason: "MacBookで周辺機器を使うならあると便利です。", query: "MacBook USB-C ハブ" }, { category: "サービス", title: "VPS", reason: "MT4/EA運用を考える場合、Mac本体ではなくVPSで動かす選択肢もあります。", query: "VPS MT4" }],
    related_articles: ["MacでMT4を使う前に確認すること", "Macはゲーム用PCとして向いている？"]
  },
  {
    id: "type_16_desktop_home", priority: 70, title: "家用デスクトップPC コスパ型", catch_copy: "家で使うならノートよりデスクトップ。画面・性能・拡張性のコスパが高いです。",
    description: "持ち運ばず家で使う人向けです。同じ予算ならノートPCより性能・冷却・画面環境を整えやすく、副業・ブログ・ChatGPT・事務作業の作業場を作りやすいタイプです。",
    ideal_summary: "家メインならデスクトップPC＋モニターの組み合わせが快適です。", realistic_summary: "7万〜12万円でも、16GBメモリとSSD搭載のWindowsデスクトップを狙いやすいです。",
    conditions: { recommend: ["Windows 11搭載", "メモリ16GB以上", "SSD512GB以上", "Core i5 / Ryzen 5以上", "外部モニターとセットで使う"], avoid: ["持ち運ぶ予定があるのにデスクトップを選ぶ", "メモリ8GB以下", "HDDのみ", "CPU世代が不明な激安中古"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: "デスクトップPCは本体だけでなく、モニター・キーボード・マウスが必要な場合があります。すでに周辺機器を持っているならコスパが高く、持っていない場合はセット販売や必要な周辺機器も確認しましょう。" },
    search_links: [{ label: "楽天市場でデスクトップPCを探す", query: affiliateQueries.desktopRyzen, platform: "rakuten" }, { label: "AmazonでデスクトップPCを探す", query: affiliateQueries.desktopBalanced, platform: "amazon" }, { label: "Yahoo!でデスクトップPCを探す", query: affiliateQueries.desktopBalanced, platform: "yahoo" }],
    cross_sell: [{ category: "周辺機器", title: "外部モニター", reason: "デスクトップPCはモニターと組み合わせることで作業効率が上がります。", query: "24インチ モニター" }, { category: "周辺機器", title: "ワイヤレスキーボード・マウス", reason: "家用の作業環境をすっきり整えられます。", query: "ワイヤレスキーボード マウス セット" }],
    related_articles: ["家で使うならノートPCよりデスクトップが向く理由", "副業用デスクトップPCの最低条件"]
  },
  {
    id: "type_17_desktop_creator_gaming", priority: 82, title: "デスクトップPC 高性能・拡張型", catch_copy: "動画編集・ゲームを家でやるなら、ノートよりデスクトップの方が冷却と性能で有利です。",
    description: "動画編集、ゲーム、クリエイティブ作業を家でしっかりやりたい人向けです。持ち運びを捨てる代わりに、性能・冷却・拡張性を重視できます。",
    ideal_summary: "重い作業を家でやるなら、RTX搭載デスクトップが候補です。", realistic_summary: "15万〜25万円前後を見ると、動画編集やゲームにも使いやすい構成を狙えます。",
    conditions: { recommend: ["Windows 11搭載", "メモリ16GB以上、できれば32GB", "SSD512GB以上、できれば1TB", "RTX系GPU搭載", "冷却性能と電源容量の確認"], avoid: ["GPUなしで重いゲームや4K編集", "メモリ8GB", "小型すぎて冷却が弱いモデル", "激安ゲーミング風PC"] },
    warnings: [], action: { title: "ECサイトで選ぶときのコツ", text: "ゲーミング・クリエイター向けのデスクトップは、GPU名を必ず確認してください。『高性能』『爆速』という言葉だけでなく、RTX搭載・メモリ容量・SSD容量・レビューを見て選ぶのが安全です。" },
    search_links: [{ label: "楽天市場でゲーミングデスクトップを探す", query: affiliateQueries.desktopGaming, platform: "rakuten" }, { label: "Amazonでクリエイター向けデスクトップを探す", query: affiliateQueries.desktopCreator, platform: "amazon" }, { label: "Yahoo!でゲーミングデスクトップを探す", query: affiliateQueries.desktopGaming, platform: "yahoo" }],
    cross_sell: [{ category: "周辺機器", title: "ゲーミングモニター", reason: "ゲームや動画編集では画面の見やすさが作業効率に直結します。", query: "ゲーミングモニター 24インチ" }, { category: "周辺機器", title: "外付けSSD", reason: "動画素材やゲームデータの保存に便利です。", query: "外付けSSD 1TB" }],
    related_articles: ["動画編集・ゲーム用はノートとデスクトップどっちがいい？", "ゲーミングデスクトップで確認すべきスペック"]
  },
];

export function findDiagnosisType(id: string) {
  return diagnosisTypes.find((type) => type.id === id) ?? diagnosisTypes[1];
}
