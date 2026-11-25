import type { ReactNode } from "react";
import { Container } from "../../atoms/Container/Container";
import { Heading } from "../../atoms/Heading/Heading";
import { Stack } from "../../atoms/Stack/Stack";

export interface AppHeaderProps {
  /** Application title rendered as the page's top-level `h1`. */
  title: string;
  /** Optional navigation links wrapped in `<nav aria-label="Main">`. */
  nav?: ReactNode;
  /** Optional action controls aligned to the right side of the header. */
  actions?: ReactNode;
}

export function AppHeader({ title, nav, actions }: AppHeaderProps) {
  return (
    <header className="border-b border-border bg-surface-raised text-text">
      <Container padding="md">
        <Stack direction="row" align="center" justify="between" gap="md" wrap>
          <Stack direction="row" align="center" gap="lg" wrap>
            <Heading level={1} size="xl">
              {title}
            </Heading>
            {nav && <nav aria-label="Main">{nav}</nav>}
          </Stack>
          {actions}
        </Stack>
      </Container>
    </header>
  );
}
