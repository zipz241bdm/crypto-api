import { Outlet } from "react-router";
import { DashboardLayout } from "./DashboardLayout";

export function AppLayout() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
