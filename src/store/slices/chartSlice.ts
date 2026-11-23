import type { StateCreator } from "zustand";
import { DEFAULT_CHART_METRIC, DEFAULT_CHART_TYPE } from "../../constants/chartOptions";
import type { AppState, ChartSlice } from "../types";

export const createChartSlice: StateCreator<AppState, [], [], ChartSlice> = (set) => ({
  chartType: DEFAULT_CHART_TYPE,
  chartMetric: DEFAULT_CHART_METRIC,
  setChartType: (chartType) => set({ chartType }),
  setChartMetric: (chartMetric) => set({ chartMetric }),
});
