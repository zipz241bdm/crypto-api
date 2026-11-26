import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
export type TextTone = "default" | "muted" | "success" | "danger" | "warning" | "favorite";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextAlign = "left" | "center" | "right";

export interface TextProps extends Omit<ComponentPropsWithoutRef<"p">, "className"> {
  /** Semantic element to render. */
  as?: "p" | "span" | "div" | "small";
  /** Font-size token. */
  size?: TextSize;
  /** Semantic text color. */
  tone?: TextTone;
  /** Font-weight token. */
  weight?: TextWeight;
  /** Horizontal text alignment. */
  align?: TextAlign;
  /** Transforms text to uppercase. */
  uppercase?: boolean;
  /** Enables tabular numerals (`tabular-nums`) for aligned numbers. */
  numeric?: boolean;
}

const SIZES: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
};

const TONES: Record<TextTone, string> = {
  default: "text-text",
  muted: "text-text-muted",
  success: "text-success",
  danger: "text-danger",
  warning: "text-warning",
  favorite: "text-favorite",
};

const WEIGHTS: Record<TextWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const ALIGNS: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function Text({
  as: Tag = "p",
  size = "md",
  tone = "default",
  weight = "normal",
  align,
  uppercase = false,
  numeric = false,
  children,
  ...rest
}: TextProps) {
  return (
    <Tag
      {...rest}
      className={cx(
        SIZES[size],
        TONES[tone],
        WEIGHTS[weight],
        align && ALIGNS[align],
        uppercase && "uppercase",
        numeric && "tabular-nums",
      )}
    >
      {children}
    </Tag>
  );
}
