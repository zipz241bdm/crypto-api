import { CHART_METRIC_OPTIONS, CHART_TYPE_OPTIONS } from "../constants/chartOptions";
import type { PersistedState } from "./types";

function isOneOf<T extends string>(value: unknown, options: { value: T }[]): value is T {
  return options.some((option) => option.value === value);
}

export function sanitizePersistedState(raw: unknown): Partial<PersistedState> {
  if (typeof raw !== "object" || raw === null) return {};
  const saved = raw as Record<string, unknown>;
  const result: Partial<PersistedState> = {};

  if (saved.theme === "light" || saved.theme === "dark") result.theme = saved.theme;
  if (Array.isArray(saved.favoriteIds)) {
    result.favoriteIds = saved.favoriteIds.filter((id): id is string => typeof id === "string");
  }
  if (isOneOf(saved.chartType, CHART_TYPE_OPTIONS)) result.chartType = saved.chartType;
  if (isOneOf(saved.chartMetric, CHART_METRIC_OPTIONS)) result.chartMetric = saved.chartMetric;

  return result;
}
