import type { Platform } from "@/data/diagnosisTypes";

const enc = (q: string) => encodeURIComponent(q);

export function buildSearchUrl(platform: Platform, query: string) {
  const q = enc(query);
  const rakutenAff = process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID || "";
  const amazonTag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "";
  const yahooVc = process.env.NEXT_PUBLIC_YAHOO_AFFILIATE_ID || "";

  if (platform === "rakuten") {
    const base = `https://search.rakuten.co.jp/search/mall/${q}/`;
    return rakutenAff ? `${base}?l-id=search_regular&scid=af_pc_etc&sc2id=${rakutenAff}` : base;
  }
  if (platform === "amazon") {
    const base = `https://www.amazon.co.jp/s?k=${q}`;
    return amazonTag ? `${base}&tag=${amazonTag}` : base;
  }
  if (platform === "yahoo") {
    const base = `https://shopping.yahoo.co.jp/search?p=${q}`;
    return yahooVc ? `${base}&vc_lpp=${yahooVc}` : base;
  }
  return `https://kakaku.com/search_results/${q}/`;
}
