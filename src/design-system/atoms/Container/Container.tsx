import type { ComponentPropsWithoutRef } from "react";
import { cx } from "../../utils/cx";

export type ContainerMaxWidth = "page" | "narrow" | "full";
export type ContainerPadding = "none" | "sm" | "md" | "lg";

export interface ContainerProps extends Omit<ComponentPropsWithoutRef<"div">, "className"> {
  /** Maximum width token for the centered container. */
  maxWidth?: ContainerMaxWidth;
  /** Inner padding token. */
  padding?: ContainerPadding;
  /** Semantic element to render. */
  as?: "div" | "main" | "section";
}

const MAX_WIDTHS: Record<ContainerMaxWidth, string> = {
  page: "max-w-page",
  narrow: "max-w-narrow",
  full: "max-w-none",
};

const PADDINGS: Record<ContainerPadding, string> = {
  none: "",
  sm: "p-sm",
  md: "p-md",
  lg: "p-lg",
};

export function Container({
  maxWidth = "page",
  padding = "md",
  as: Tag = "div",
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag {...rest} className={cx("mx-auto w-full", MAX_WIDTHS[maxWidth], PADDINGS[padding])}>
      {children}
    </Tag>
  );
}
