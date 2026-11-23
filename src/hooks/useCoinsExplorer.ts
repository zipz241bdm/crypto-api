import { useMemo } from "react";
import { coinsToKpis } from "../mappers/coinsToKpis";
import { filtersToMarketsParams } from "../mappers/filtersToMarketsParams";
import { selectFavoriteIds, selectFilters } from "../store/selectors";
import { useAppStore } from "../store/useAppStore";
import type { CoinMarket } from "../types/coingecko";
import { filterCoinsBySearch } from "../utils/filterCoins";
import { useDebounce } from "./useDebounce";
import { useMarkets } from "./useMarkets";

const FILTER_DEBOUNCE_MS = 400;
const EMPTY_COINS: CoinMarket[] = [];

export function useCoinsExplorer() {
  const filters = useAppStore(selectFilters);
  const favoriteIds = useAppStore(selectFavoriteIds);
  const debouncedFilters = useDebounce(filters, FILTER_DEBOUNCE_MS);

  const marketsParams = useMemo(() => filtersToMarketsParams(debouncedFilters), [debouncedFilters]);
  const { data, loading, error, reload } = useMarkets(marketsParams);

  const { favoritesOnly } = filters;
  const coins = useMemo(() => {
    const searched = filterCoinsBySearch(data ?? EMPTY_COINS, debouncedFilters.search);
    return favoritesOnly ? searched.filter((coin) => favoriteIds.includes(coin.id)) : searched;
  }, [data, debouncedFilters.search, favoritesOnly, favoriteIds]);
  const kpis = useMemo(() => coinsToKpis(coins), [coins]);

  return {
    coins,
    kpis,
    isInitialLoading: loading && data === null,
    isRefreshing: loading && data !== null,
    error,
    reload,
  };
}
