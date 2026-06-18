import type { CrossSell, Platform } from "@/data/diagnosisTypes";
import { buildSearchUrl } from "@/lib/affiliate";

export function CrossSellCard({ item }: { item: CrossSell }) {
  const content = <><span className="badge">{item.category}</span><strong>{item.title}</strong><p className="small">{item.reason}</p></>;
  if (item.query) {
    const platform: Platform = item.platform ?? "rakuten";
    return <a className="crossItem" href={buildSearchUrl(platform, item.query)} target="_blank" rel="nofollow sponsored noopener noreferrer">{content}</a>;
  }
  return <div className="crossItem">{content}</div>;
}
