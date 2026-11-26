import { getErrorMessage } from "../../api/client";
import { useGlobalStats } from "../../hooks/useGlobalStats";
import { globalToKpis } from "../../mappers/globalToKpis";
import { ErrorState } from "../feedback/ErrorState";
import { LoadingState } from "../feedback/LoadingState";
import { KpiCard } from "../widgets/KpiCard";

export function MarketOverviewContainer() {
  const stats = useGlobalStats();

  if (stats.status === "loading") {
    return <LoadingState label="Loading market overview..." />;
  }

  if (stats.status === "error") {
    return <ErrorState message={getErrorMessage(stats.error)} onRetry={stats.reload} />;
  }

  const kpis = globalToKpis(stats.data);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} title={kpi.title} value={kpi.value} change={kpi.change} />
      ))}
    </div>
  );
}
