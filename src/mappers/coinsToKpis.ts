import type { CoinMarket } from "../types/coingecko";
import type { KpiItem } from "../types/dashboard";
import { formatCompactUsd } from "../utils/format";

export function coinsToKpis(coins: readonly CoinMarket[]): KpiItem[] {
  const hasCoins = coins.length > 0;

  const withCap = coins.filter((coin) => coin.market_cap !== null);
  const totalCap = withCap.reduce((sum, coin) => sum + (coin.market_cap ?? 0), 0);

  const withCapChange = coins.filter(
    (coin) => coin.market_cap !== null && coin.market_cap_change_24h !== null,
  );
  const capNow = withCapChange.reduce((sum, coin) => sum + (coin.market_cap ?? 0), 0);
  const capChange = withCapChange.reduce((sum, coin) => sum + (coin.market_cap_change_24h ?? 0), 0);
  const capBefore = capNow - capChange;
  const capChangePercent = capBefore > 0 ? (capChange / capBefore) * 100 : null;

  const withVolume = coins.filter((coin) => coin.total_volume !== null);
  const totalVolume = withVolume.reduce((sum, coin) => sum + (coin.total_volume ?? 0), 0);

  const topGainer = coins.reduce<CoinMarket | null>((best, coin) => {
    if (coin.price_change_percentage_24h === null) return best;
    if (best === null || best.price_change_percentage_24h === null) return coin;
    return coin.price_change_percentage_24h > best.price_change_percentage_24h ? coin : best;
  }, null);

  return [
    { id: "coins-shown", title: "Coins Shown", value: String(coins.length), change: null },
    {
      id: "market-cap",
      title: "Total Market Cap",
      value: withCap.length > 0 ? formatCompactUsd(totalCap) : "-",
      change: capChangePercent,
    },
    {
      id: "volume-24h",
      title: "Total 24h Volume",
      value: withVolume.length > 0 ? formatCompactUsd(totalVolume) : "-",
      change: null,
    },
    {
      id: "top-gainer",
      title: "Top Gainer (24h)",
      value: hasCoins && topGainer ? `${topGainer.name} (${topGainer.symbol.toUpperCase()})` : "-",
      change: topGainer?.price_change_percentage_24h ?? null,
    },
  ];
}
