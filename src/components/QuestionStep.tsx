"use client";
import Image from "next/image";
import type { Question } from "@/data/questions";
import type { Answers } from "@/lib/diagnose";

export function QuestionStep({ question, answers, setAnswers }: { question: Question; answers: Answers; setAnswers: (answers: Answers) => void }) {
  const current = (answers as any)[question.id];
  const toggle = (value: string) => {
    if (question.isMultiple) {
      const arr = Array.isArray(current) ? current : [];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      setAnswers({ ...answers, [question.id]: next });
    } else {
      setAnswers({ ...answers, [question.id]: value });
    }
  };

  const isFormFactor = question.id === "formFactor";

  return (
    <section className={`question ${isFormFactor ? "formFactorQuestion" : ""}`}>
      <h2>{question.title}</h2>
      {question.description && <p className="desc">{question.description}</p>}

      {isFormFactor && question.imageSrc && (
        <div className="formFactorImageWrap" aria-label="デスクトップPCとノートPCの画像選択">
          <Image
            src={question.imageSrc}
            alt="デスクトップPCとノートPCの違いを説明する画像"
            width={1200}
            height={900}
            className="questionGuideImage"
            priority
          />
          <button
            type="button"
            className={`imageHotspot imageHotspotDesktop ${current === "desktop" ? "active" : ""}`}
            aria-label="デスクトップPCを選択"
            onClick={() => toggle("desktop")}
          >
            <span>{current === "desktop" ? "✓ デスクトップPCを選択中" : "デスクトップPCを選ぶ"}</span>
          </button>
          <button
            type="button"
            className={`imageHotspot imageHotspotLaptop ${current === "laptop" ? "active" : ""}`}
            aria-label="ノートPCを選択"
            onClick={() => toggle("laptop")}
          >
            <span>{current === "laptop" ? "✓ ノートPCを選択中" : "ノートPCを選ぶ"}</span>
          </button>
        </div>
      )}

      <div className="choices">
        {question.choices.map((choice) => {
          const active = question.isMultiple ? Array.isArray(current) && current.includes(choice.value) : current === choice.value;
          return <button key={choice.value} className={`choice ${active ? "active" : ""}`} onClick={() => toggle(choice.value)} type="button">{choice.label}</button>;
        })}
      </div>
    </section>
  );
}
