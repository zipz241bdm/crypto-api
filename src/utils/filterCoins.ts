import type { CoinMarket } from "../types/coingecko";

export function filterCoinsBySearch(
  coins: readonly CoinMarket[],
  search: string,
): readonly CoinMarket[] {
  const query = search.trim().toLowerCase();
  if (query === "") return coins;

  return coins.filter(
    (coin) => coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query),
  );
}
