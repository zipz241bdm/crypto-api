export type SortDirection = "asc" | "desc";

export interface SortState<K extends string> {
  key: K;
  direction: SortDirection;
}

function compareValues(a: unknown, b: unknown): number {
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b, undefined, { sensitivity: "base" });
  }
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  return 0;
}

export function sortItems<T, K extends keyof T & string>(
  items: readonly T[],
  sort: SortState<K>,
): T[] {
  const factor = sort.direction === "asc" ? 1 : -1;

  return items.toSorted((x, y) => {
    const a = x[sort.key];
    const b = y[sort.key];

    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;

    return compareValues(a, b) * factor;
  });
}
