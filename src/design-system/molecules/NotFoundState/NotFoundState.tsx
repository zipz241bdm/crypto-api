import type { ReactNode } from "react";
import { Heading, type HeadingLevel } from "../../atoms/Heading/Heading";
import { Text } from "../../atoms/Text/Text";

export interface NotFoundStateProps {
  /** Main not-found heading text. */
  title: string;
  /** Supporting message below the heading. */
  message: string;
  /** Semantic heading level (`h1`–`h4`). */
  headingLevel?: HeadingLevel;
  /** Optional navigation or recovery action below the message. */
  action?: ReactNode;
}

export function NotFoundState({
  title,
  message,
  headingLevel = 2,
  action,
}: NotFoundStateProps) {
  return (
    <div className="grid place-items-center gap-xs py-xl text-center">
      <Heading level={headingLevel} size="2xl">
        {title}
      </Heading>
      <Text tone="muted">{message}</Text>
      {action}
    </div>
  );
}
