// Requests

export type PriceChangeWindow = "1h" | "24h" | "7d" | "14d" | "30d" | "200d" | "1y";

export type CoinsMarketsOrder =
  | "market_cap_asc"
  | "market_cap_desc"
  | "volume_asc"
  | "volume_desc"
  | "id_asc"
  | "id_desc";

export type CoinsMarketsLocale =
  | "ar"
  | "bg"
  | "cs"
  | "da"
  | "de"
  | "el"
  | "en"
  | "es"
  | "fi"
  | "fr"
  | "he"
  | "hi"
  | "hr"
  | "hu"
  | "id"
  | "it"
  | "ja"
  | "ko"
  | "lt"
  | "nl"
  | "no"
  | "pl"
  | "pt"
  | "ro"
  | "ru"
  | "sk"
  | "sl"
  | "sv"
  | "th"
  | "tr"
  | "uk"
  | "vi"
  | "zh"
  | "zh-tw";

export type CoinsMarketsPrecision =
  | "full"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "16"
  | "17"
  | "18";

/** GET /coins/markets. When several filters are sent, the API prioritises category > ids > names > symbols. */
export interface CoinsMarketsParams {
  vs_currency: string;
  ids?: string[];
  names?: string[];
  symbols?: string[];
  include_tokens?: "top" | "all";
  category?: string;
  order?: CoinsMarketsOrder;
  per_page?: number; // 1...250
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: PriceChangeWindow[];
  locale?: CoinsMarketsLocale;
  precision?: CoinsMarketsPrecision;
  include_rehypothecated?: boolean;
}

export type CoinsCategoriesOrder =
  | "market_cap_desc"
  | "market_cap_asc"
  | "name_desc"
  | "name_asc"
  | "market_cap_change_24h_desc"
  | "market_cap_change_24h_asc";

/** GET /coins/categories */
export interface CoinsCategoriesParams {
  order?: CoinsCategoriesOrder;
}

// Responses

export interface Roi {
  times: number;
  currency: string;
  percentage: number;
}

export interface Sparkline {
  price: number[];
}

/** One item of the GET /coins/markets response. */
export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  ath_date: string | null;
  atl: number | null;
  atl_change_percentage: number | null;
  atl_date: string | null;
  roi: Roi | null;
  last_updated: string;
  market_cap_rank_with_rehypothecated?: number | null;
  sparkline_in_7d?: Sparkline;
  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_24h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  price_change_percentage_14d_in_currency?: number | null;
  price_change_percentage_30d_in_currency?: number | null;
  price_change_percentage_200d_in_currency?: number | null;
  price_change_percentage_1y_in_currency?: number | null;
}

export interface FearAndGreedIndex {
  value: number;
  sentiment: "extreme_fear" | "fear" | "neutral" | "greed" | "extreme_greed";
}

export interface GlobalData {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: Record<string, number>;
  total_volume: Record<string, number>;
  market_cap_percentage: Record<string, number>;
  market_cap_change_percentage_24h_usd: number;
  volume_change_percentage_24h_usd: number;
  updated_at: number;
  fear_and_greed_index?: FearAndGreedIndex;
}

export interface GlobalResponse {
  data: GlobalData;
}

/** One item of the GET /coins/categories response. */
export interface CoinCategory {
  id: string;
  name: string;
  market_cap: number;
  market_cap_change_24h: number;
  content: string;
  top_3_coins_id: string[];
  top_3_coins: string[];
  volume_24h: number;
  updated_at: string;
}

export type CoinCategories = CoinCategory[];
