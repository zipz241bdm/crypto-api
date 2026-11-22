const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Sub-dollar prices (meme coins, etc.) need more decimals to be meaningful.
const usdSmallFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 6,
});

export function formatUsd(price: number | null): string {
  if (price == null) return "-";
  return (price >= 1 ? usdFormatter : usdSmallFormatter).format(price);
}

export function formatChange(change: number | null): string {
  if (change == null) return "-";
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}

export function getChangeColor(change: number | null): string {
  if (change == null) return "";
  return change >= 0 ? "text-green-600" : "text-red-600";
}

export function formatCompactUsd(value: number | null): string {
  if (value == null) return "-";
  if (value >= 1_000_000_000_000) return `$${(value / 1_000_000_000_000).toFixed(1)}T`;
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  return `$${value.toFixed(2)}`;
}

export function formatSignedUsd(value: number | null): string {
  if (value == null) return "-";
  return `${value >= 0 ? "+" : "-"}${formatUsd(Math.abs(value))}`;
}

const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

export function formatNumber(value: number | null): string {
  if (value == null) return "-";
  return numberFormatter.format(value);
}

export function formatDate(iso: string | null): string {
  if (iso == null) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateTime(iso: string | null): string {
  if (iso == null) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  const text = date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });
  return `${text} UTC`;
}
