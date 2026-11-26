import { Grid, StatCard, type StatCardChange } from "../../design-system";
import type { KpiItem } from "../../types/dashboard";
import { formatChange } from "../../utils/format";

export interface KpiGridProps {
  kpis: KpiItem[];
}

function toStatChange(change: number | null | undefined): StatCardChange | undefined {
  if (change == null) return undefined;
  return {
    text: formatChange(change),
    tone: change >= 0 ? "success" : "danger",
  };
}

export function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <Grid columns={1} mdColumns={2} lgColumns={4} gap="md">
      {kpis.map((kpi) => (
        <StatCard
          key={kpi.id}
          label={kpi.title}
          value={kpi.value}
          change={toStatChange(kpi.change)}
        />
      ))}
    </Grid>
  );
}
