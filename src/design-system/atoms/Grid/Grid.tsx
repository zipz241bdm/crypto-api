import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export type GridColumns = 1 | 2 | 3 | 4 | 6;
export type GridGap = "none" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type GridAlign = "start" | "center" | "end" | "stretch";

export interface GridProps extends Omit<HTMLAttributes<HTMLElement>, "className"> {
  /** Base column count. */
  columns?: GridColumns;
  /** Column count from the `sm` breakpoint. */
  smColumns?: GridColumns;
  /** Column count from the `md` breakpoint. */
  mdColumns?: GridColumns;
  /** Column count from the `lg` breakpoint. */
  lgColumns?: GridColumns;
  /** Spacing token between grid cells. */
  gap?: GridGap;
  /** Vertical alignment of items within grid rows. */
  align?: GridAlign;
  /** Semantic element to render. */
  as?: "div" | "section";
}

const BASE_COLUMNS: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
};

const SM_COLUMNS: Record<GridColumns, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
};

const MD_COLUMNS: Record<GridColumns, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  6: "md:grid-cols-6",
};

const LG_COLUMNS: Record<GridColumns, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  6: "lg:grid-cols-6",
};

const GAPS: Record<GridGap, string> = {
  none: "gap-0",
  "2xs": "gap-2xs",
  xs: "gap-xs",
  sm: "gap-sm",
  md: "gap-md",
  lg: "gap-lg",
  xl: "gap-xl",
  "2xl": "gap-2xl",
};

const ALIGNS: Record<GridAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

export function Grid({
  columns = 1,
  smColumns,
  mdColumns,
  lgColumns,
  gap = "md",
  align,
  as: Tag = "div",
  children,
  ...rest
}: GridProps) {
  return (
    <Tag
      {...rest}
      className={cx(
        "grid",
        BASE_COLUMNS[columns],
        smColumns && SM_COLUMNS[smColumns],
        mdColumns && MD_COLUMNS[mdColumns],
        lgColumns && LG_COLUMNS[lgColumns],
        GAPS[gap],
        align && ALIGNS[align],
      )}
    >
      {children}
    </Tag>
  );
}
