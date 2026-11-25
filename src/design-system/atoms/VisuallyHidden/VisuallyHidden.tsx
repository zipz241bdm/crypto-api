import type { ReactNode } from "react";

export interface VisuallyHiddenProps {
  /** Semantic element to render. */
  as?: "span" | "div" | "caption" | "figcaption";
  /** Content visible only to assistive technologies. */
  children: ReactNode;
}

export function VisuallyHidden({ as: Tag = "span", children }: VisuallyHiddenProps) {
  return <Tag className="sr-only">{children}</Tag>;
}
