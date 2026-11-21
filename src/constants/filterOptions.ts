import type { CoinsMarketsOrder } from "../types/coingecko";
import type { CoinFilters, SelectOption } from "../types/dashboard";

export const DEFAULT_FILTERS: CoinFilters = {
  search: "",
  category: "",
  order: "market_cap_desc",
  limit: "50",
};

export const CATEGORY_OPTIONS: SelectOption[] = [
  { value: "", label: "All" },
  { value: "layer-1", label: "Layer 1" },
  { value: "layer-2", label: "Layer 2" },
  { value: "decentralized-finance-defi", label: "DeFi" },
  { value: "stablecoins", label: "Stablecoins" },
  { value: "meme-token", label: "Meme" },
  { value: "artificial-intelligence", label: "AI" },
  { value: "gaming", label: "Gaming" },
];

export const ORDER_OPTIONS: SelectOption<CoinsMarketsOrder>[] = [
  { value: "market_cap_desc", label: "Market cap (largest first)" },
  { value: "market_cap_asc", label: "Market cap (smallest first)" },
  { value: "volume_desc", label: "24h volume (highest first)" },
];

export const LIMIT_OPTIONS: SelectOption[] = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];
