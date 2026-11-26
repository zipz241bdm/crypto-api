import type { KpiItem } from "../../types/dashboard";
import { KpiCard } from "./KpiCard";

export interface KpiGridProps {
  kpis: KpiItem[];
}

export function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} title={kpi.title} value={kpi.value} change={kpi.change} />
      ))}
    </div>
  );
}
