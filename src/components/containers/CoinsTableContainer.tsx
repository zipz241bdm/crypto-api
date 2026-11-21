import { getErrorMessage } from "../../api/client";
import { useMarkets } from "../../hooks/useMarkets";
import { useSort } from "../../hooks/useSort";
import type { CoinMarket } from "../../types/coingecko";
import type { CoinSortKey } from "../../types/dashboard";
import type { SortDirection, SortState } from "../../utils/sort";
import { EmptyState } from "../feedback/EmptyState";
import { ErrorState } from "../feedback/ErrorState";
import { LoadingState } from "../feedback/LoadingState";
import { CoinsTable } from "../widgets/CoinsTable";

// Module-level constants keep their reference stable between renders (needed by useMemo in useSort).
const EMPTY_COINS: CoinMarket[] = [];
const INITIAL_SORT: SortState<CoinSortKey> = { key: "market_cap_rank", direction: "asc" };
const DEFAULT_DIRECTIONS: Partial<Record<CoinSortKey, SortDirection>> = {
  current_price: "desc",
  price_change_percentage_24h: "desc",
  market_cap: "desc",
};

export function CoinsTableContainer() {
  const markets = useMarkets();

  const coins = markets.status === "success" ? markets.data : EMPTY_COINS;
  const { sortedItems, sortState, toggleSort } = useSort(coins, INITIAL_SORT, DEFAULT_DIRECTIONS);

  if (markets.status === "loading") {
    return <LoadingState label="Loading coins..." />;
  }

  if (markets.status === "error") {
    return <ErrorState message={getErrorMessage(markets.error)} onRetry={markets.reload} />;
  }

  if (markets.data.length === 0) {
    return <EmptyState message="No coins to show." />;
  }

  return <CoinsTable coins={sortedItems} sortState={sortState} onSort={toggleSort} />;
}
