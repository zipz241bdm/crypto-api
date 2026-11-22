import { Outlet } from "react-router";
import { FiltersProvider } from "../../contexts/FiltersProvider";
import { DashboardLayout } from "./DashboardLayout";

export function AppLayout() {
  return (
    <FiltersProvider>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </FiltersProvider>
  );
}
