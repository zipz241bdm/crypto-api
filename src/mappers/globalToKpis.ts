import type { GlobalResponse } from "../types/coingecko";
import type { KpiItem } from "../types/dashboard";

function formatCurrencyCompact(value: number): string {
  if (value >= 1_000_000_000_000) {
    return "$" + (value / 1_000_000_000_000).toFixed(1) + "T";
  }
  if (value >= 1_000_000_000) {
    return "$" + (value / 1_000_000_000).toFixed(1) + "B";
  }
  if (value >= 1_000_000) {
    return "$" + (value / 1_000_000).toFixed(1) + "M";
  }
  return "$" + value.toFixed(2);
}

function formatPercentage(value: number): string {
  return value.toFixed(2) + "%";
}

export function globalToKpis(globalResponse: GlobalResponse): KpiItem[] {
  const { data } = globalResponse;
  return [
    {
      id: "total-market-cap",
      title: "Total Market Cap",
      value: formatCurrencyCompact(data.total_market_cap.usd),
      change: data.market_cap_change_percentage_24h_usd,
    },
    {
      id: "24h-volume",
      title: "24h Volume",
      value: formatCurrencyCompact(data.total_volume.usd),
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
