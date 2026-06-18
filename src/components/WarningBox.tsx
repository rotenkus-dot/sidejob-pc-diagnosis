import type { Warning } from "@/data/diagnosisTypes";
export function WarningBox({ warning }: { warning: Warning }) {
  return <div className="card warn"><strong>{warning.title}</strong><p>{warning.text}</p></div>;
}
