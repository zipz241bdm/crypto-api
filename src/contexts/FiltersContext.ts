import { createContext } from "react";
import type { useCoinFilters } from "../hooks/useCoinFilters";

export type FiltersContextValue = ReturnType<typeof useCoinFilters>;

export const FiltersContext = createContext<FiltersContextValue | null>(null);
