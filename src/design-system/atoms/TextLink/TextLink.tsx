import type { ComponentPropsWithoutRef } from "react";
import { Link } from "react-router";
import { cx } from "../../utils/cx";

export type TextLinkTone = "primary" | "default";
export type TextLinkWeight = "normal" | "medium";
export type TextLinkUnderline = "hover" | "always";

export interface TextLinkProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "className"> {
  /** Link color tone. */
  tone?: TextLinkTone;
  /** Font-weight token. */
  weight?: TextLinkWeight;
  /** Controls when the underline is shown. */
  underline?: TextLinkUnderline;
}

const TONES: Record<TextLinkTone, string> = {
  primary: "text-primary",
  default: "text-text",
};

const WEIGHTS: Record<TextLinkWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
};

const UNDERLINES: Record<TextLinkUnderline, string> = {
  hover: "hover:underline",
  always: "underline",
};

export function TextLink({
  tone = "primary",
  weight = "normal",
  underline = "hover",
  ...rest
}: TextLinkProps) {
  return (
    <Link
      {...rest}
      className={cx(
        "w-fit rounded-sm underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        TONES[tone],
        WEIGHTS[weight],
        UNDERLINES[underline],
      )}
    />
  );
}
