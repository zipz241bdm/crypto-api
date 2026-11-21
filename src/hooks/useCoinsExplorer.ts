import { useMemo } from "react";
import { coinsToKpis } from "../mappers/coinsToKpis";
import { filtersToMarketsParams } from "../mappers/filtersToMarketsParams";
import type { CoinMarket } from "../types/coingecko";
import { filterCoinsBySearch } from "../utils/filterCoins";
import { useCoinFilters } from "./useCoinFilters";
import { useDebounce } from "./useDebounce";
import { useMarkets } from "./useMarkets";

const FILTER_DEBOUNCE_MS = 400;
const EMPTY_COINS: CoinMarket[] = [];

export function useCoinsExplorer() {
  const { control, filters, isDirty, resetFilters } = useCoinFilters();
  const debouncedFilters = useDebounce(filters, FILTER_DEBOUNCE_MS);

  const marketsParams = useMemo(() => filtersToMarketsParams(debouncedFilters), [debouncedFilters]);
  const { data, loading, error, reload } = useMarkets(marketsParams);

  const coins = useMemo(
    () => filterCoinsBySearch(data ?? EMPTY_COINS, debouncedFilters.search),
    [data, debouncedFilters.search],
  );
  const kpis = useMemo(() => coinsToKpis(coins), [coins]);

  return {
    control,
    isDirty,
    resetFilters,
    coins,
    kpis,
    isInitialLoading: loading && data === null,
    isRefreshing: loading && data !== null,
    error,
    reload,
  };
}
