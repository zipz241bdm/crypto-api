import type { GlobalResponse } from "../types/coingecko";
import type { KpiItem } from "../types/dashboard";
import { formatCompactUsd } from "../utils/format";

function formatPercentage(value: number): string {
  return value.toFixed(2) + "%";
}

export function globalToKpis(globalResponse: GlobalResponse): KpiItem[] {
  const { data } = globalResponse;
  return [
    {
      id: "total-market-cap",
      title: "Total Market Cap",
      value: formatCompactUsd(data.total_market_cap.usd),
      change: data.market_cap_change_percentage_24h_usd,
    },
    {
      id: "24h-volume",
      title: "24h Volume",
      value: formatCompactUsd(data.total_volume.usd),
      change: data.volume_change_percentage_24h_usd,
    },
    {
      id: "btc-dominance",
      title: "BTC Dominance",
      value: formatPercentage(data.market_cap_percentage.btc),
      change: null,
    },
  ];
}
