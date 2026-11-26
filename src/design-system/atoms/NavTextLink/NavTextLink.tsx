import type { ComponentPropsWithoutRef } from "react";
import { NavLink } from "react-router";

/** Navigation link props forwarded to React Router's `NavLink`, excluding `className` and `style`. */
export type NavTextLinkProps = Omit<
  ComponentPropsWithoutRef<typeof NavLink>,
  "className" | "style"
>;

export function NavTextLink(props: NavTextLinkProps) {
  return (
    <NavLink
      {...props}
      className="rounded-sm text-text-muted underline-offset-2 hover:text-text hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring aria-[current=page]:font-semibold aria-[current=page]:text-text"
    />
  );
}
