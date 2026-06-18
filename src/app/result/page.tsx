import { ResultCard } from "@/components/ResultCard";
import { diagnose, type Answers } from "@/lib/diagnose";

export default async function ResultPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const paramsObj = await searchParams;
  const get = (key: string) => {
    const value = paramsObj[key];
    return Array.isArray(value) ? value[0] ?? "" : value ?? "";
  };
  const answers: Answers = {
    formFactor: get("formFactor"),
    purposes: get("purposes").split(",").filter(Boolean),
    mobility: get("mobility"),
    budget: get("budget"),
    os: get("os"),
    lifespan: get("lifespan"),
    condition: get("condition"),
  };
  const result = diagnose(answers);
  return <><ResultCard result={result} /><footer className="container footer">広告表記：本サイトはアフィリエイトリンクを含みます。リンク先の価格・在庫・条件は変更される場合があります。</footer></>;
}
