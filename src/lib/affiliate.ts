import type { Platform } from "@/data/diagnosisTypes";

const enc = (q: string) => encodeURIComponent(q);

const MOSHIMO_A_ID = "5642390";
const MOSHIMO_RAKUTEN_P_ID = "54";
const MOSHIMO_RAKUTEN_PC_ID = "54";
const MOSHIMO_RAKUTEN_PL_ID = "616";

function buildMoshimoRakutenUrl(query: string) {
  const rakutenSearchUrl = `https://search.rakuten.co.jp/search/mall/${enc(query)}/`;
  const encodedTargetUrl = encodeURIComponent(rakutenSearchUrl);

  return `https://af.moshimo.com/af/c/click?a_id=${MOSHIMO_A_ID}&p_id=${MOSHIMO_RAKUTEN_P_ID}&pc_id=${MOSHIMO_RAKUTEN_PC_ID}&pl_id=${MOSHIMO_RAKUTEN_PL_ID}&url=${encodedTargetUrl}`;
}

export function buildSearchUrl(platform: Platform, query: string) {
  const q = enc(query);
  const amazonTag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "";
  const yahooVc = process.env.NEXT_PUBLIC_YAHOO_AFFILIATE_ID || "";

  if (platform === "rakuten") {
    return buildMoshimoRakutenUrl(query);
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
