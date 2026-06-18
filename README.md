# 副業・動画編集・AI初心者向け｜地雷PC回避診断

専門用語なしで、ユーザーの用途・予算・持ち運び・OS希望から「買っていい条件」「避けたい条件」「ECサイトで探す検索条件」を出すNext.js製MVPです。

## コンセプト

旧：あなたに合うPCをおすすめします  
新：初心者が地雷PCを買わないための、予算別PC診断

PC初心者が怖いのは「どれが良いか分からない」よりも「高いお金を出して失敗したくない」ことです。  
そのため、このサイトは特定商品ではなく、失敗しにくい買い方・検索条件・避けるべき条件を提示します。

## 実装済み機能

- 6問の診断フォーム
- 14タイプの診断結果DB
- `rescueRules.ts` によるゼロ件回避・矛盾救済ロジック
- `affiliateQueries.ts` による地雷除去検索クエリ
- `avoidRules.ts` による全タイプ共通の地雷PCチェックリスト
- 警告は優先度順に最大2件だけ表示
- 楽天 / Amazon / Yahoo / 価格.com の検索リンク生成
- クロスセル導線は `query` があれば楽天検索リンク化
- ステマ規制対策として広告・アフィリエイト表記を常時表示
- トップページ下部にFAQセクションを追加
- SEO向けmetadata / OGP / Twitterカードの基本設定
- `npm run build` 成功確認済み

## 重要ファイル

```txt
src/data/questions.ts
src/data/diagnosisTypes.ts
src/data/rescueRules.ts
src/data/affiliateQueries.ts
src/data/avoidRules.ts
src/data/faqs.ts
src/lib/diagnose.ts
src/lib/affiliate.ts
src/app/page.tsx
src/app/result/page.tsx
```

## 起動方法

```bash
npm install
npm run dev
```

ブラウザで開きます。

```txt
http://localhost:3000
```

## 本番ビルド確認

```bash
npm run build
```

このZIP作成時点ではビルド成功済みです。

## アフィリエイトID設定

`.env.local` を作って、必要なIDを設定してください。

```bash
NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID=ここに楽天ID
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourtag-22
NEXT_PUBLIC_YAHOO_AFFILIATE_ID=ここにYahoo/VC系ID
```

注意：URLパラメータはASP・各サービスの最新仕様に合わせて必ず確認してください。Amazonの商品画像・価格表示・API利用は規約確認が必要です。

## 現在の救済ルール

- 予算7万円以下 × 動画編集 → 低予算クリエイティブ限界突破タイプ
- 予算7万円以下 × ゲーム → PCゲームはクラウド/軽量ゲーム割り切りタイプ
- 予算7万円以下 × プログラミング → まずは中古・軽量開発タイプ
- 重い用途が複数 × 予算12万円以下 → 欲張り全部入り・予算調整タイプ

## 地雷除去検索クエリ例

```txt
ノートパソコン 新品 Windows11搭載 Core i5 12世代 16GB 512GB
ノートパソコン 新品 Windows11搭載 Ryzen 5 7000 16GB 512GB
中古ノートパソコン Windows11対応 Core i5 第10世代以降 16GB SSD
MacBook Air M1 中古 16GB 512GB
ゲーミングノート 新品 Windows11 RTX 16GB 512GB
```

## FAQに入れている訴求

- なぜ特定のパソコン1台をおすすめしないのか
- 中古パソコンは不安ではないのか
- 家電量販店で買うのはダメなのか
- メモリ8GBでも大丈夫か
- このサイトのリンクは広告なのか

## 次の収益化ステップ

1. 楽天アフィリエイトIDを入れる
2. Amazonアソシエイトタグを入れる
3. Yahoo!/バリューコマース導線を確認して入れる
4. Vercelへデプロイ
5. SEO記事を最低5本追加
   - 5万円台で動画編集PCを探す現実ライン
   - 7万円以下でゲーミングノートを買うのが危険な理由
   - ChatGPT副業に必要なPCスペック
   - MT4用PCはMacよりWindowsが安全な理由
   - メモリ8GBと16GBの違い

## 注意

このサイトは一般的な買い物補助情報です。購入前に、販売ページの価格・在庫・仕様・保証・返品条件・CPU世代・OS対応を必ず確認してください。


## Vercelデプロイ時の環境変数

VercelのProject Settings → Environment Variablesで以下を設定してください。

```bash
NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID=ここに楽天ID
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=yourtag-22
NEXT_PUBLIC_YAHOO_AFFILIATE_ID=ここにYahoo/VC系ID
```

設定後、Production環境で再デプロイしてください。


## v4 pre-release notes

- 予算「〜5万円」を追加し、動画編集/ゲーム希望の場合は「今買わない」救済ルートへ着地します。
- 結果ページ上部に広告表記を追加し、スマホでも見える位置にしました。
- 検索ボタンに「安全ワード適用済み」を明記し、クリック意図を強化しました。
