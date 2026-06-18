import { faqs } from "@/data/faqs";

export function FaqSection() {
  return (
    <section className="container faqSection" aria-labelledby="faq-title">
      <div className="card">
        <span className="badge">よくある不安</span>
        <h2 id="faq-title">買う前にここだけ確認してください</h2>
        <p className="small">
          初心者が高いPCで失敗しないための、最低限の考え方です。
        </p>
        <div className="faqGrid">
          {faqs.map((faq) => (
            <details className="faqItem" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
