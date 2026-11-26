import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";

export type CardVariant = "outlined" | "raised";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps extends Omit<ComponentPropsWithoutRef<"div">, "className"> {
  /** Surface border and elevation style. */
  variant?: CardVariant;
  /** Inner padding token. */
  padding?: CardPadding;
  /** Semantic element to render. */
  as?: "div" | "section" | "article" | "figure";
}

const VARIANTS: Record<CardVariant, string> = {
  outlined: "",
  raised: "shadow-sm",
};

const PADDINGS: Record<CardPadding, string> = {
  none: "",
  sm: "p-sm",
  md: "p-md",
  lg: "p-lg",
};

export function Card({
  variant = "outlined",
  padding = "md",
  as: Tag = "div",
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      {...rest}
      className={cx(
        "rounded-lg border border-border bg-surface-raised text-text",
        VARIANTS[variant],
        PADDINGS[padding],
      )}
    >
      {children}
    </Tag>
  );
}
