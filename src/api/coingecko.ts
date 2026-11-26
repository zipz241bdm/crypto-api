import type { CoinMarket, CoinsMarketsParams } from "../types/coingecko";
import { request } from "./client";

/** GET /coins/markets: list of coins with market data. */
export function fetchMarkets(
  params: CoinsMarketsParams,
  signal?: AbortSignal,
): Promise<CoinMarket[]> {
  return request<CoinMarket[]>("/coins/markets", { params, signal });
}

/**
 * Loads one coin by its CoinGecko id through /coins/markets?ids=.
 * Resolves to null when the coin does not exist (the API answers 200 with an empty list).
 */
export async function fetchCoinById(
  params: { id: string },
  signal?: AbortSignal,
): Promise<CoinMarket | null> {
  const id = params.id.trim();
  if (id === "") return null;

  const coins = await fetchMarkets({ vs_currency: "usd", ids: [id] }, signal);
  return coins.find((coin) => coin.id === id) ?? null;
}
