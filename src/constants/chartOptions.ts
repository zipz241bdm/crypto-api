import type { ChartMetric, ChartType, SelectOption } from "../types/dashboard";
import { formatChange, formatCompactUsd } from "../utils/format";

export const CHART_MAX_POINTS = 20;

export const PIE_MAX_SLICES_PER_RING = 8;

export const DEFAULT_CHART_TYPE: ChartType = "bar";
export const DEFAULT_CHART_METRIC: ChartMetric = "price_change_percentage_24h";

export const CHART_TYPE_OPTIONS: SelectOption<ChartType>[] = [
  { value: "bar", label: "Bar" },
  { value: "pie", label: "Pie" },
];

export const CHART_METRIC_OPTIONS: SelectOption<ChartMetric>[] = [
  { value: "price_change_percentage_24h", label: "24h price change" },
  { value: "market_cap", label: "Market cap" },
  { value: "total_volume", label: "24h volume" },
];

export const CHART_METRIC_LABELS: Record<ChartMetric, string> = {
  price_change_percentage_24h: "24h price change",
  market_cap: "Market cap",
  total_volume: "24h volume",
};

export const CHART_METRIC_FORMATTERS: Record<ChartMetric, (value: number) => string> = {
  price_change_percentage_24h: formatChange,
  market_cap: formatCompactUsd,
  total_volume: formatCompactUsd,
};
