import type { StateCreator } from "zustand";
import type { AppState, FavoritesSlice } from "../types";

export const createFavoritesSlice: StateCreator<AppState, [], [], FavoritesSlice> = (set) => ({
  favoriteIds: [],
  addFavorite: (id) =>
    set((state) =>
      state.favoriteIds.includes(id) ? state : { favoriteIds: [...state.favoriteIds, id] },
    ),
  removeFavorite: (id) =>
    set((state) => ({ favoriteIds: state.favoriteIds.filter((favoriteId) => favoriteId !== id) })),
});
