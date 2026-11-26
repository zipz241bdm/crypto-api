import type { ReactNode } from "react";
import { cx } from "../../utils/cx";

export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingSize = "sm" | "md" | "lg" | "xl" | "2xl";

export interface HeadingProps {
  /** Semantic heading level (`h1`–`h4`). */
  level: HeadingLevel;
  /** Visual font-size token, independent of semantic level. */
  size?: HeadingSize;
  /** Optional HTML id for `aria-labelledby` references. */
  id?: string;
  /** Heading content. */
  children: ReactNode;
}

const SIZES: Record<HeadingSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
};

const DEFAULT_SIZE: Record<HeadingLevel, HeadingSize> = { 1: "2xl", 2: "xl", 3: "lg", 4: "md" };

export function Heading({ level, size, id, children }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} className={cx("font-semibold text-text", SIZES[size ?? DEFAULT_SIZE[level]])}>
      {children}
    </Tag>
  );
}
