import type { CoinsMarketsParams } from "../types/coingecko";
import type { CoinFilters } from "../types/dashboard";

export function filtersToMarketsParams(filters: CoinFilters): CoinsMarketsParams {
  return {
    vs_currency: "usd",
    order: filters.order,
    per_page: Number(filters.limit),
    page: 1,
    sparkline: false,
    category: filters.category || undefined,
  };
}
