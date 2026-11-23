import type { StateCreator } from "zustand";
import { DEFAULT_FILTERS } from "../../constants/filterOptions";
import type { AppState, FiltersSlice } from "../types";

export const createFiltersSlice: StateCreator<AppState, [], [], FiltersSlice> = (set) => ({
  filters: DEFAULT_FILTERS,
  setFilter: (key, value) => set((state) => ({ filters: { ...state.filters, [key]: value } })),
  resetFilters: () => set({ filters: DEFAULT_FILTERS }),
});
