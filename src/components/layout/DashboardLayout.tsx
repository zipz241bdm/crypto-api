import type { ReactNode } from "react";
import { AppHeader, Container, NavTextLink } from "../../design-system";
import { ROUTES } from "../../router/paths";
import { ThemeToggle } from "../widgets/ThemeToggle";

export interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <AppHeader
        title="Crypto Dashboard"
        nav={
          <NavTextLink to={ROUTES.home} end>
            Dashboard
          </NavTextLink>
        }
        actions={<ThemeToggle />}
      />
      <Container as="main" padding="md">
        {children}
      </Container>
    </>
  );
}
