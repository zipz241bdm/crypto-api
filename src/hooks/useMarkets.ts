import { fetchMarkets } from "../api/coingecko";
import type { CoinMarket, CoinsMarketsParams } from "../types/coingecko";
import { useFetch } from "./useFetch";

/** Coins with market data (GET /coins/markets) for the given request params. */
export function useMarkets(params: CoinsMarketsParams) {
  return useFetch<CoinMarket[], CoinsMarketsParams>(fetchMarkets, params);
}
