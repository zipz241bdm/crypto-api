import { DEFAULT_MARKETS_PARAMS, fetchMarkets } from "../api/coingecko";
import type { CoinMarket } from "../types/coingecko";
import { useApiData } from "./useApiData";

const fetchDefaultMarkets = (signal: AbortSignal) => fetchMarkets(DEFAULT_MARKETS_PARAMS, signal);

/** Coins with market data (GET /coins/markets). */
export function useMarkets() {
  return useApiData<CoinMarket[]>(fetchDefaultMarkets);
}
