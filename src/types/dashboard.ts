import type { CoinsMarketsOrder } from "./coingecko";

export interface KpiItem {
  id: string;
  title: string;
  value: string;
  change?: number | null;
}

export type ThemeMode = "light" | "dark";

export type CoinSortKey =
  | "market_cap_rank"
  | "name"
  | "current_price"
  | "price_change_percentage_24h"
  | "market_cap";

export interface CoinFilters {
  search: string;
  category: string;
  order: CoinsMarketsOrder;
  limit: string;
}

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

export type ChartType = "bar" | "pie";

export type ChartMetric = "price_change_percentage_24h" | "market_cap" | "total_volume";

export interface ChartDatum {
  id: string;
  label: string;
  name: string;
  value: number;
}

export interface PieSlice extends ChartDatum {
  magnitude: number;
}

export interface PieRing {
  sign: "positive" | "negative";
  slices: PieSlice[];
  total: number;
}

export interface PieRings {
  inner: PieRing;
  outer: PieRing | null;
}
