export interface KpiItem {
  id: string;
  title: string;
  value: string;
  change?: number | null;
}

export type ThemeMode = "light" | "dark";

export interface CategoryOption {
  id: string;
  name: string;
  coinIds: string[];
}

export type CoinSortKey =
  | "market_cap_rank"
  | "name"
  | "current_price"
  | "price_change_percentage_24h"
  | "market_cap";
