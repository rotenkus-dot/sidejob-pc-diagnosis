import type { DiagnosisResult } from "@/lib/diagnose";
import { globalAvoidRules } from "@/data/avoidRules";
import { SearchButton } from "./SearchButton";
import { WarningBox } from "./WarningBox";
import { CrossSellCard } from "./CrossSellCard";

export function ResultCard({ result }: { result: DiagnosisResult }) {
  const type = result.type;
  return <main className="container resultHero">
    <a className="logo" href="/">← もう一度診断する</a>
    <div className="adNotice resultNotice">広告表記：本サイトはアフィリエイトリンクを含みます</div>
    <div className="card">
      <span className="badge">地雷PC回避診断 結果</span>
      <h1 className="resultTitle">{type.title}</h1>
      <p className="catch">{type.catch_copy}</p>
      <p>{type.description}</p>
      <div className="pillrow"><span className="pill">理想：{type.ideal_summary}</span><span className="pill">現実解：{type.realistic_summary}</span></div>
    </div>

    {result.warnings.length > 0 && <div className="grid" style={{ marginTop: 16 }}>{result.warnings.map(w => <WarningBox key={w.id} warning={w} />)}</div>}

    <div className="columns" style={{ marginTop: 16 }}>
      <section className="card ok"><h2>買っていい条件</h2><ul className="list">{type.conditions.recommend.map(v => <li key={v}>{v}</li>)}</ul></section>
      <section className="card avoid"><h2>このタイプで避けたい条件</h2><ul className="list">{type.conditions.avoid.map(v => <li key={v}>{v}</li>)}</ul></section>
    </div>

    <section className="card avoid" style={{ marginTop: 16 }}>
      <h2>全タイプ共通：地雷PCチェックリスト</h2>
      <p className="small">安く見えても、初心者の最初の1台では避けた方が安全な条件です。</p>
      <ul className="list">{globalAvoidRules.map(rule => <li key={rule}>{rule}</li>)}</ul>
    </section>

    <section className="card" style={{ marginTop: 16 }}><h2>{type.action.title}</h2><p>{type.action.text}</p></section>

    <section className="card ctaCard" style={{ marginTop: 16 }}><h2>安全ワード適用済み検索</h2><p className="small">下のボタンを押すと、地雷を避けやすい検索ワードを入れた状態でECサイトを開きます。リンク先では価格・送料・保証・レビュー・CPU世代・Windows11対応表記を必ず確認してください。</p><div className="searchGrid">{type.search_links.map(link => <SearchButton key={`${link.platform}-${link.query}`} link={link} />)}</div></section>

    <section className="card" style={{ marginTop: 16 }}><h2>一緒にあると快適なもの</h2><div className="cross">{type.cross_sell.map(item => <CrossSellCard key={`${item.category}-${item.title}`} item={item} />)}</div></section>

    <section className="card" style={{ marginTop: 16 }}><h2>関連記事の種</h2><ul className="list">{type.related_articles.map(a => <li key={a}>{a}</li>)}</ul></section>
  </main>;
}
