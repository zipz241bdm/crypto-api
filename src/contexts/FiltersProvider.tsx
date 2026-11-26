import { useMemo, type ReactNode } from "react";
import { useCoinFilters } from "../hooks/useCoinFilters";
import { FiltersContext, type FiltersContextValue } from "./FiltersContext";

export interface FiltersProviderProps {
  children: ReactNode;
}

export function FiltersProvider({ children }: FiltersProviderProps) {
  const { control, filters, isDirty, resetFilters } = useCoinFilters();

  const value = useMemo<FiltersContextValue>(
    () => ({ control, filters, isDirty, resetFilters }),
    [control, filters, isDirty, resetFilters],
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}
