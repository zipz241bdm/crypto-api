import type { CoinSortKey } from "../../types/dashboard";
import type { SortState } from "../../utils/sort";

export interface SortableHeaderProps {
  label: string;
  sortKey: CoinSortKey;
  sortState: SortState<CoinSortKey>;
  onSort: (key: CoinSortKey) => void;
  align?: "left" | "right";
}

export function SortableHeader({
  label,
  sortKey,
  sortState,
  onSort,
  align = "left",
}: SortableHeaderProps) {
  const isActive = sortState.key === sortKey;
  const isAscending = sortState.direction === "asc";
  const ariaSort = isActive ? (isAscending ? "ascending" : "descending") : "none";
  const arrow = isActive ? (isAscending ? "▲" : "▼") : "↕";
  const isRight = align === "right";

  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className={`px-3 py-2 font-medium ${isRight ? "text-right" : "text-left"}`}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={`inline-flex cursor-pointer items-center gap-1 hover:underline ${isRight ? "flex-row-reverse" : ""}`}
      >
        <span>{label}</span>
        <span aria-hidden="true" className={isActive ? "" : "text-gray-400"}>
          {arrow}
        </span>
      </button>
    </th>
  );
}
