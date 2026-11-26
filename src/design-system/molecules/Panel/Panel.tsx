import { useId, type ReactNode } from "react";
import { Card, type CardPadding, type CardVariant } from "../../atoms/Card/Card";
import { Heading, type HeadingLevel, type HeadingSize } from "../../atoms/Heading/Heading";
import { Stack } from "../../atoms/Stack/Stack";

export interface PanelProps {
  /** Section heading text. */
  title: string;
  /** Semantic heading level (`h1`–`h4`). */
  headingLevel?: HeadingLevel;
  /** Visual heading size token. */
  headingSize?: HeadingSize;
  /** Card border and elevation variant. */
  variant?: CardVariant;
  /** Card inner padding token. */
  padding?: CardPadding;
  /** Optional header action slot aligned opposite the title. */
  actions?: ReactNode;
  /** Panel body content. */
  children: ReactNode;
}

export function Panel({
  title,
  headingLevel = 2,
  headingSize = "lg",
  variant = "outlined",
  padding = "md",
  actions,
  children,
}: PanelProps) {
  const headingId = useId();

  return (
    <Card as="section" aria-labelledby={headingId} variant={variant} padding={padding}>
      <Stack gap="sm">
        <Stack direction="row" align="center" justify="between" gap="sm" wrap>
          <Heading id={headingId} level={headingLevel} size={headingSize}>
            {title}
          </Heading>
          {actions}
        </Stack>
        {children}
      </Stack>
    </Card>
  );
}
