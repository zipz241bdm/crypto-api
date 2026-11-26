import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { sanitizePersistedState } from "./persistence";
import { createChartSlice } from "./slices/chartSlice";
import { createFavoritesSlice } from "./slices/favoritesSlice";
import { createFiltersSlice } from "./slices/filtersSlice";
import { createThemeSlice } from "./slices/themeSlice";
import type { AppState, PersistedState } from "./types";

export const STORAGE_KEY = "crypto-dashboard";

export const useAppStore = create<AppState>()(
  persist(
    (...args) => ({
      ...createThemeSlice(...args),
      ...createFiltersSlice(...args),
      ...createFavoritesSlice(...args),
      ...createChartSlice(...args),
    }),
    {
      name: STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state): PersistedState => ({
        theme: state.theme,
        favoriteIds: state.favoriteIds,
        chartType: state.chartType,
        chartMetric: state.chartMetric,
      }),
      merge: (persisted, current) => ({ ...current, ...sanitizePersistedState(persisted) }),
    },
  ),
);
