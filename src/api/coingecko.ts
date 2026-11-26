import type { CoinMarket, CoinsMarketsParams } from "../types/coingecko";
import { request } from "./client";

/** GET /coins/markets: list of coins with market data. */
export function fetchMarkets(
  params: CoinsMarketsParams,
  signal?: AbortSignal,
): Promise<CoinMarket[]> {
  return request<CoinMarket[]>("/coins/markets", { params, signal });
}
