"use client";
import { useMemo, useState } from "react";
import { questions } from "@/data/questions";
import { QuestionStep } from "@/components/QuestionStep";
import { emptyAnswers, isComplete, type Answers } from "@/lib/diagnose";
import { FaqSection } from "@/components/FaqSection";

export default function Home() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers());
  const completed = useMemo(() => {
    let count = 0;
    if (answers.formFactor) count++;
    if (answers.purposes.length) count++;
    if (answers.mobility) count++;
    if (answers.budget) count++;
    if (answers.os) count++;
    if (answers.lifespan) count++;
    if (answers.condition) count++;
    return count;
  }, [answers]);
  const progress = Math.round((completed / questions.length) * 100);

  const startDiagnosis = () => {
    const params = new URLSearchParams();
    params.set("formFactor", answers.formFactor);
    params.set("purposes", answers.purposes.join(","));
    params.set("mobility", answers.mobility);
    params.set("budget", answers.budget);
    params.set("os", answers.os);
    params.set("lifespan", answers.lifespan);
    params.set("condition", answers.condition);
    window.location.href = `/result?${params.toString()}`;
  };

  return <>
    <header className="container topbar"><a href="/" className="logo">地雷PC回避診断</a><span className="small">MVP版</span></header>
    <main className="container hero">
      <span className="adNotice">広告表記：本サイトはアフィリエイトリンクを含みます</span>
      <h1>副業・動画編集・AI初心者向け。地雷PCを避ける買い方を診断します。</h1>
      <p className="lead">高いお金を出して失敗しないために、あなたの用途・予算の矛盾を翻訳し、現実的な検索条件と避けるべき条件を出します。</p>
      <div className="card">
        <div className="progress"><div style={{ width: `${progress}%` }} /></div>
        {questions.map(q => <QuestionStep key={q.id} question={q} answers={answers} setAnswers={setAnswers} />)}
        <div className="actions"><button className="btn" disabled={!isComplete(answers)} onClick={startDiagnosis}>診断結果を見る</button><button className="btn secondary" onClick={() => setAnswers(emptyAnswers())}>リセット</button></div>
        {!isComplete(answers) && <p className="small">すべての質問に答えると診断できます。</p>}
      </div>
    </main>
    <FaqSection />
    <footer className="container footer">© 地雷PC回避診断 / 掲載内容は一般的な目安です。購入前に各販売ページの価格・仕様・保証を必ず確認してください。</footer>
  </>;
}
