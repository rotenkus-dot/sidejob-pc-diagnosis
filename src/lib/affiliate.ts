import type { Platform } from "@/data/diagnosisTypes";

const enc = (q: string) => encodeURIComponent(q);

const MOSHIMO_RAKUTEN = {
  aId: "5642390",
  pId: "54",
  pcId: "54",
  plId: "616",
};

const MOSHIMO_YAHOO = {
  aId: "5642441",
  pId: "1225",
  pcId: "1925",
  plId: "18502",
};

function buildMoshimoUrl(ids: {
  aId: string;
  pId: string;
  pcId: string;
  plId: string;
}, targetUrl: string) {
  const encodedTargetUrl = encodeURIComponent(targetUrl);

  return `https://af.moshimo.com/af/c/click?a_id=${ids.aId}&p_id=${ids.pId}&pc_id=${ids.pcId}&pl_id=${ids.plId}&url=${encodedTargetUrl}`;
}

function buildMoshimoRakutenUrl(query: string) {
  const rakutenSearchUrl = `https://search.rakuten.co.jp/search/mall/${enc(query)}/`;
  return buildMoshimoUrl(MOSHIMO_RAKUTEN, rakutenSearchUrl);
}

function buildMoshimoYahooUrl(query: string) {
  const yahooSearchUrl = `https://shopping.yahoo.co.jp/search?p=${enc(query)}`;
  return buildMoshimoUrl(MOSHIMO_YAHOO, yahooSearchUrl);
}

export function buildSearchUrl(platform: Platform, query: string) {
  const q = enc(query);
  const amazonTag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "";

  if (platform === "rakuten") {
    return buildMoshimoRakutenUrl(query);
  }

  if (platform === "yahoo") {
    return buildMoshimoYahooUrl(query);
  }

  if (platform === "amazon") {
    const base = `https://www.amazon.co.jp/s?k=${q}`;
    return amazonTag ? `${base}&tag=${amazonTag}` : base;
  }

  return `https://kakaku.com/search_results/${q}/`;
}
