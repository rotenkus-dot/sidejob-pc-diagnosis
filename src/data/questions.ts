export interface Choice { label: string; value: string; }
export interface Question { id: string; title: string; description?: string; isMultiple: boolean; imageSrc?: string; choices: Choice[]; }

export const questions: Question[] = [
  { id: "formFactor", title: "Q0. どっちの形がいいですか？", description: "見た目で近い方を選べばOKです。画像の左側・右側をタップして選べます。", isMultiple: false, imageSrc: "/images/q0-form-factor.png", choices: [
    { label: "デスクトップPC。家で使うことが多い", value: "desktop" },
    { label: "ノートPC。持ち運びたい", value: "laptop" },
    { label: "どちらでもいい。コスパで選びたい", value: "either" },
    { label: "よく分からない。おすすめを決めてほしい", value: "recommend" }
  ]},
  { id: "purposes", title: "Q1. パソコンで一番やりたいことは？", description: "あてはまるものをすべて選んでください。専門用語は不要です。", isMultiple: true, choices: [
    { label: "ネット検索・YouTube・動画視聴・買い物", value: "basic" },
    { label: "事務作業・資料作成・ブログ執筆", value: "blog" },
    { label: "ChatGPT・Canva・SNS運用・副業スタート", value: "ai_sns" },
    { label: "動画編集・画像加工・デザイン", value: "video" },
    { label: "プログラミング・Web制作・アプリ開発", value: "program" },
    { label: "FX・MT4・自動売買・チャート表示", value: "fx" },
    { label: "オンラインゲーム・Steam・重い3Dゲーム", value: "game" }
  ]},
  { id: "mobility", title: "Q2. どれくらい持ち運びますか？", isMultiple: false, choices: [
    { label: "毎日持ち運ぶ。軽さ最優先", value: "daily" },
    { label: "たまに持ち運ぶ。バランス重視", value: "sometimes" },
    { label: "ほぼ家で使う。画面の大きさとコスパ重視", value: "home" }
  ]},
  { id: "budget", title: "Q3. 予算はどれくらい？", isMultiple: false, choices: [
    { label: "かなり厳しい：〜5万円（地雷を避ける救済ルート）", value: "very_low" },
    { label: "できるだけ安く抑えたい：5万〜7万円", value: "low" },
    { label: "失敗しにくいコスパ重視：7万〜12万円", value: "middle" },
    { label: "長く快適に使いたい：12万〜20万円", value: "high" },
    { label: "仕事道具としてしっかり投資：20万円以上", value: "premium" }
  ]},
  { id: "os", title: "Q4. WindowsとMac、希望はありますか？", isMultiple: false, choices: [
    { label: "Windowsがいい", value: "windows" },
    { label: "Macがいい", value: "mac" },
    { label: "どちらでもいい。コスパで選びたい", value: "either" },
    { label: "よく分からない。おすすめを決めてほしい", value: "recommend" }
  ]},
  { id: "lifespan", title: "Q5. 何年くらい使いたいですか？", isMultiple: false, choices: [
    { label: "2年くらい。まずは安く始めたい", value: "short" },
    { label: "4〜5年しっかり使いたい。後悔したくない", value: "long" },
    { label: "仕事道具として長く使いたい。快適さ重視", value: "pro" }
  ]},
  { id: "condition", title: "Q6. 中古・整備済品も候補に入れていいですか？", isMultiple: false, choices: [
    { label: "新品だけがいい", value: "no" },
    { label: "状態や保証が良ければ中古・整備済もOK", value: "yes" },
    { label: "よく分からない。安全な方で選んでほしい", value: "safe" }
  ]}
];
