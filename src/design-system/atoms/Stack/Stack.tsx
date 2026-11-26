import type { HTMLAttributes } from "react";
import { cx } from "../../utils/cx";

export type StackDirection = "row" | "column";
export type StackGap = "none" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between";

export interface StackProps extends Omit<HTMLAttributes<HTMLElement>, "className"> {
  /** Flex direction of stacked items. */
  direction?: StackDirection;
  /** Spacing token between items. */
  gap?: StackGap;
  /** Cross-axis alignment. */
  align?: StackAlign;
  /** Main-axis distribution. */
  justify?: StackJustify;
  /** Allow items to wrap onto multiple lines. */
  wrap?: boolean;
  /** Semantic element to render. */
  as?: "div" | "section" | "article" | "header" | "main" | "nav" | "ul" | "ol";
}

const DIRECTIONS: Record<StackDirection, string> = {
  row: "flex-row",
  column: "flex-col",
};

const GAPS: Record<StackGap, string> = {
  none: "gap-0",
  "2xs": "gap-2xs",
  xs: "gap-xs",
  sm: "gap-sm",
  md: "gap-md",
  lg: "gap-lg",
  xl: "gap-xl",
  "2xl": "gap-2xl",
};

const ALIGNS: Record<StackAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const JUSTIFIES: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export function Stack({
  direction = "column",
  gap = "md",
  align,
  justify,
  wrap = false,
  as: Tag = "div",
  children,
  ...rest
}: StackProps) {
  return (
    <Tag
      {...rest}
      className={cx(
        "flex",
        DIRECTIONS[direction],
        GAPS[gap],
        align && ALIGNS[align],
        justify && JUSTIFIES[justify],
        wrap && "flex-wrap",
      )}
    >
      {children}
    </Tag>
  );
}
