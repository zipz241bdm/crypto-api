import type { StateCreator } from "zustand";
import type { AppState, ThemeSlice } from "../types";

export const createThemeSlice: StateCreator<AppState, [], [], ThemeSlice> = (set) => ({
  theme: "light",
  toggleTheme: () => set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
});
