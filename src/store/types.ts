import type { ChartMetric, ChartType, CoinFilters, ThemeMode } from "../types/dashboard";

export interface ThemeSlice {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export interface FiltersSlice {
  filters: CoinFilters;
  setFilter: <K extends keyof CoinFilters>(key: K, value: CoinFilters[K]) => void;
  resetFilters: () => void;
}

export interface FavoritesSlice {
  favoriteIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export interface ChartSlice {
  chartType: ChartType;
  chartMetric: ChartMetric;
  setChartType: (type: ChartType) => void;
  setChartMetric: (metric: ChartMetric) => void;
}

export type AppState = ThemeSlice & FiltersSlice & FavoritesSlice & ChartSlice;

export type PersistedState = Pick<AppState, "theme" | "favoriteIds" | "chartType" | "chartMetric">;
