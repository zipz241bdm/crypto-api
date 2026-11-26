import { CHART_MAX_POINTS } from "../constants/chartOptions";
import type { CoinMarket } from "../types/coingecko";
import type { ChartDatum, ChartMetric } from "../types/dashboard";

export function coinsToChartData(
  coins: readonly CoinMarket[],
  metric: ChartMetric,
  maxPoints: number = CHART_MAX_POINTS,
): ChartDatum[] {
  const data: ChartDatum[] = [];

  for (const coin of coins) {
    const value = coin[metric];
    if (value === null) continue;

    data.push({ id: coin.id, label: coin.symbol.toUpperCase(), name: coin.name, value });
    if (data.length === maxPoints) break;
  }

  return data;
}
