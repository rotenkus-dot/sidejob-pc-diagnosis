import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "副業・動画編集・AI初心者向け｜地雷PC回避診断",
  description: "専門用語なしで、用途・予算・持ち運びから失敗しにくいPCの買い方、避けるべき地雷条件、ECサイトで使う検索ワードを診断します。",
  keywords: [
    "副業 PC",
    "動画編集 パソコン",
    "ChatGPT 副業 パソコン",
    "地雷PC",
    "ノートパソコン 選び方",
    "初心者 PC 診断",
    "MT4 パソコン",
  ],
  openGraph: {
    title: "副業・動画編集・AI初心者向け｜地雷PC回避診断",
    description: "高いお金を出して失敗しないために、あなたに必要なPC条件と避けるべき条件を診断します。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "地雷PC回避診断",
    description: "初心者が損しにくいPCの買い方と検索条件を診断します。",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
