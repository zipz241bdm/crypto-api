import { fetchCoinById } from "../api/coingecko";
import type { CoinMarket } from "../types/coingecko";
import { useFetch } from "./useFetch";

export function useCoinDetails(id: string) {
  return useFetch<CoinMarket | null, { id: string }>(fetchCoinById, { id });
}
