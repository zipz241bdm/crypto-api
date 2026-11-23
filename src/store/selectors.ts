import { DEFAULT_FILTERS } from "../constants/filterOptions";
import type { CoinFilters } from "../types/dashboard";
import type { AppState } from "./types";

export const selectTheme = (state: AppState) => state.theme;
export const selectToggleTheme = (state: AppState) => state.toggleTheme;

export const selectFilters = (state: AppState) => state.filters;
export const selectSetFilter = (state: AppState) => state.setFilter;
export const selectResetFilters = (state: AppState) => state.resetFilters;
export const selectIsFiltersDirty = (state: AppState): boolean =>
  (Object.keys(DEFAULT_FILTERS) as (keyof CoinFilters)[]).some(
    (key) => state.filters[key] !== DEFAULT_FILTERS[key],
  );

export const selectFavoriteIds = (state: AppState) => state.favoriteIds;
export const selectIsFavorite = (coinId: string) => (state: AppState) =>
  state.favoriteIds.includes(coinId);
export const selectAddFavorite = (state: AppState) => state.addFavorite;
export const selectRemoveFavorite = (state: AppState) => state.removeFavorite;

export const selectChartType = (state: AppState) => state.chartType;
export const selectChartMetric = (state: AppState) => state.chartMetric;
export const selectSetChartType = (state: AppState) => state.setChartType;
export const selectSetChartMetric = (state: AppState) => state.setChartMetric;
