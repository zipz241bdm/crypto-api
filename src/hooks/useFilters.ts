import { useContext } from "react";
import { FiltersContext, type FiltersContextValue } from "../contexts/FiltersContext";

export function useFilters(): FiltersContextValue {
  const context = useContext(FiltersContext);
  if (context === null) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
}
