import type { CoinMarket, CoinsMarketsParams, GlobalResponse } from "../types/coingecko";
import { request } from "./client";

export const DEFAULT_MARKETS_PARAMS: CoinsMarketsParams = {
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: 25,
  page: 1,
  sparkline: false,
};

/** GET /global: market-wide stats used by the KPI cards. */
export function fetchGlobal(signal?: AbortSignal): Promise<GlobalResponse> {
  return request<GlobalResponse>("/global", { signal });
}

/** GET /coins/markets: list of coins with market data used by the table. */
export function fetchMarkets(
  params: CoinsMarketsParams,
  signal?: AbortSignal,
): Promise<CoinMarket[]> {
  return request<CoinMarket[]>("/coins/markets", { params, signal });
}
