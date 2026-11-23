import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { getErrorMessage } from "../../api/client";
import { useCoinsExplorer } from "../../hooks/useCoinsExplorer";
import { useSort } from "../../hooks/useSort";
import { coinPath } from "../../router/paths";
import type { CoinSortKey } from "../../types/dashboard";
import type { SortDirection, SortState } from "../../utils/sort";
import { EmptyState } from "../feedback/EmptyState";
import { ErrorState } from "../feedback/ErrorState";
import { LoadingState } from "../feedback/LoadingState";
import { Section } from "../layout/Section";
import { CoinsChartContainer } from "./CoinsChartContainer";
import { CoinsTable } from "../widgets/CoinsTable";
import { FiltersPanel } from "../widgets/FiltersPanel";
import { KpiGrid } from "../widgets/KpiGrid";

const INITIAL_SORT: SortState<CoinSortKey> = { key: "market_cap_rank", direction: "asc" };
const DEFAULT_DIRECTIONS: Partial<Record<CoinSortKey, SortDirection>> = {
  current_price: "desc",
  price_change_percentage_24h: "desc",
  market_cap: "desc",
};

export function CoinsExplorerContainer() {
  const { coins, kpis, isInitialLoading, isRefreshing, error, reload } = useCoinsExplorer();
  const navigate = useNavigate();
  const { sortedItems, sortState, toggleSort } = useSort(coins, INITIAL_SORT, DEFAULT_DIRECTIONS);

  let tableContent: ReactNode;
  if (isInitialLoading) {
    tableContent = <LoadingState label="Loading coins..." />;
  } else if (error !== null) {
    tableContent = <ErrorState message={getErrorMessage(error)} onRetry={reload} />;
  } else if (coins.length === 0) {
    tableContent = <EmptyState message="No coins match your filters." />;
  } else {
    tableContent = (
      <div
        aria-busy={isRefreshing}
        className={`transition-opacity ${isRefreshing ? "opacity-60" : ""}`}
      >
        <CoinsTable
          coins={sortedItems}
          sortState={sortState}
          onSort={toggleSort}
          onSelectCoin={(coinId) => navigate(coinPath(coinId))}
        />
      </div>
    );
  }

  let chartContent: ReactNode;
  if (isInitialLoading) {
    chartContent = <LoadingState label="Loading chart..." />;
  } else if (error !== null) {
    chartContent = (
      <EmptyState message="The chart is unavailable while the data cannot be loaded." />
    );
  } else if (coins.length === 0) {
    chartContent = <EmptyState message="No coins to chart." />;
  } else {
    chartContent = (
      <div className={`transition-opacity ${isRefreshing ? "opacity-60" : ""}`}>
        <CoinsChartContainer coins={coins} />
      </div>
    );
  }

  return (
    <>
      <Section title="Filters">
        <FiltersPanel />
      </Section>
      <Section title="Market Overview">
        <KpiGrid kpis={kpis} />
      </Section>
      <Section title="Chart">{chartContent}</Section>
      <Section title="Top Coins">{tableContent}</Section>
    </>
  );
}
