import type { SearchLink } from "@/data/diagnosisTypes";
import { buildSearchUrl } from "@/lib/affiliate";

export function SearchButton({ link }: { link: SearchLink }) {
  const url = buildSearchUrl(link.platform, link.query);
  return <a className="searchBtn" href={url} target="_blank" rel="nofollow sponsored noopener noreferrer"><strong>【安全ワード適用済み】</strong>{link.label}<span>{link.query}</span></a>;
}
