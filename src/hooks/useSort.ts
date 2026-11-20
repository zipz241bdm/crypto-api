import { useMemo, useState } from "react";
import { sortItems, type SortDirection, type SortState } from "../utils/sort";

export interface UseSortResult<T, K extends string> {
  sortedItems: T[];
  sortState: SortState<K>;
  toggleSort: (key: K) => void;
}

/**
 * Owns the sort state and derives the sorted array from it.
 * `items` should be referentially stable (state from useApiData, or a module-level constant
 * while loading) so the useMemo below only recomputes when the data or the sort really changes.
 *
 * `defaultDirections` sets the direction used when a column is selected for the first time
 * (for example "desc" for numeric columns). Columns not listed start with "asc".
 */
export function useSort<T, K extends keyof T & string>(
  items: readonly T[],
  initialSort: SortState<K>,
  defaultDirections: Partial<Record<K, SortDirection>> = {},
): UseSortResult<T, K> {
  const [sortState, setSortState] = useState<SortState<K>>(initialSort);

  const sortedItems = useMemo(() => sortItems(items, sortState), [items, sortState]);

  const toggleSort = (key: K) => {
    setSortState((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: defaultDirections[key] ?? "asc" };
    });
  };

  return { sortedItems, sortState, toggleSort };
}
