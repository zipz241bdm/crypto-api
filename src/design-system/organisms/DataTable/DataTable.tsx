import type { MouseEvent, ReactNode } from "react";
import { VisuallyHidden } from "../../atoms/VisuallyHidden/VisuallyHidden";
import { cx } from "../../utils/cx";

export type DataTableSortDirection = "asc" | "desc";

export interface DataTableSortState<K extends string = string> {
  /** Active column sort key. */
  key: K;
  /** Active sort direction. */
  direction: DataTableSortDirection;
}

export interface DataTableColumn<T, K extends string = string> {
  /** Unique column identifier. */
  id: string;
  /** Column header text (used as screen-reader text when `hideHeader` is true). */
  header: string;
  /** Visually hides the header text while keeping it accessible to screen readers. */
  hideHeader?: boolean;
  /** Horizontal cell alignment. */
  align?: "left" | "right";
  /** Sort key for this column; enables interactive sorting when `onSort` is provided. */
  sortKey?: K;
  /** Renders cell content for a given row. */
  cell: (row: T) => ReactNode;
}

export interface DataTableProps<T, K extends string = string> {
  /** Column definitions. */
  columns: DataTableColumn<T, K>[];
  /** Rows to render. */
  rows: readonly T[];
  /** Returns a stable unique React key for each row. */
  getRowKey: (row: T) => string;
  /** Accessible table caption (visually hidden). */
  caption: string;
  /** Active sort state. */
  sort?: DataTableSortState<K>;
  /** Called with a column's `sortKey` when its header is clicked. */
  onSort?: (key: K) => void;
  /** Called when a non-interactive area of a row is clicked. */
  onRowClick?: (row: T) => void;
  /** Marks the table as refreshing (`aria-busy` and reduced opacity). */
  busy?: boolean;
}

interface SortableHeaderProps<K extends string> {
  label: string;
  sortKey: K;
  sort?: DataTableSortState<K>;
  onSort: (key: K) => void;
  align: "left" | "right";
}

function SortableHeader<K extends string>({
  label,
  sortKey,
  sort,
  onSort,
  align,
}: SortableHeaderProps<K>) {
  const isActive = sort?.key === sortKey;
  const isAscending = sort?.direction === "asc";
  const ariaSort = isActive ? (isAscending ? "ascending" : "descending") : "none";
  const arrow = isActive ? (isAscending ? "▲" : "▼") : "↕";
  const isRight = align === "right";

  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className={cx("px-sm py-xs font-medium", isRight ? "text-right" : "text-left")}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={cx(
          "inline-flex cursor-pointer items-center gap-2xs rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
          isRight && "flex-row-reverse",
        )}
      >
        <span>{label}</span>
        <span aria-hidden="true" className={isActive ? undefined : "text-text-muted"}>
          {arrow}
        </span>
      </button>
    </th>
  );
}

export function DataTable<T, K extends string = string>({
  columns,
  rows,
  getRowKey,
  caption,
  sort,
  onSort,
  onRowClick,
  busy = false,
}: DataTableProps<T, K>) {
  const handleRowClick = (event: MouseEvent<HTMLTableRowElement>, row: T) => {
    if (!onRowClick) return;
    if ((event.target as HTMLElement).closest("a, button, input, select")) return;
    onRowClick(row);
  };

  return (
    <div
      aria-busy={busy || undefined}
      className={cx(
        "overflow-x-auto rounded-lg border border-border bg-surface-raised text-text transition-opacity",
        busy && "opacity-60",
      )}
    >
      <table className="w-full min-w-narrow text-sm">
        <VisuallyHidden as="caption">{caption}</VisuallyHidden>
        <thead className="border-b border-border">
          <tr>
            {columns.map((column) => {
              const align = column.align ?? "left";

              if (column.sortKey && onSort) {
                return (
                  <SortableHeader
                    key={column.id}
                    label={column.header}
                    sortKey={column.sortKey}
                    sort={sort}
                    onSort={onSort}
                    align={align}
                  />
                );
              }

              return (
                <th
                  key={column.id}
                  scope="col"
                  className={cx(
                    "px-sm py-xs font-medium",
                    align === "right" ? "text-right" : "text-left",
                  )}
                >
                  {column.hideHeader ? (
                    <VisuallyHidden>{column.header}</VisuallyHidden>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={getRowKey(row)}
              onClick={onRowClick ? (event) => handleRowClick(event, row) : undefined}
              className={cx(
                "border-b border-border last:border-b-0",
                onRowClick && "cursor-pointer transition-colors hover:bg-surface-muted",
              )}
            >
              {columns.map((column) => (
                <td
                  key={column.id}
                  className={cx(
                    "px-sm py-xs",
                    column.align === "right" ? "text-right tabular-nums" : "text-left",
                  )}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
