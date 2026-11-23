import { PIE_MAX_SLICES_PER_RING } from "../constants/chartOptions";
import type { CoinMarket } from "../types/coingecko";
import type { ChartMetric, PieRing, PieRings, PieSlice } from "../types/dashboard";

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function buildRing(sign: PieRing["sign"], sorted: PieSlice[], maxSlices: number): PieRing {
  const total = sum(sorted.map((slice) => slice.value));
  if (sorted.length <= maxSlices) return { sign, slices: sorted, total };

  const top = sorted.slice(0, maxSlices - 1);
  const rest = sorted.slice(maxSlices - 1);
  const other: PieSlice = {
    id: "other",
    label: "Other",
    name: `Other (${rest.length} coins)`,
    value: sum(rest.map((slice) => slice.value)),
    magnitude: sum(rest.map((slice) => slice.magnitude)),
  };
  return { sign, slices: [...top, other], total };
}

export function coinsToPieRings(
  coins: readonly CoinMarket[],
  metric: ChartMetric,
  maxSlicesPerRing: number = PIE_MAX_SLICES_PER_RING,
): PieRings | null {
  const positives: PieSlice[] = [];
  const negatives: PieSlice[] = [];

  for (const coin of coins) {
    const value = coin[metric];
    if (value === null || value === 0) continue;

    const slice: PieSlice = {
      id: coin.id,
      label: coin.symbol.toUpperCase(),
      name: coin.name,
      value,
      magnitude: Math.abs(value),
    };
    (value > 0 ? positives : negatives).push(slice);
  }

  const byMagnitude = (a: PieSlice, b: PieSlice) => b.magnitude - a.magnitude;
  const positiveRing =
    positives.length > 0
      ? buildRing("positive", positives.toSorted(byMagnitude), maxSlicesPerRing)
      : null;
  const negativeRing =
    negatives.length > 0
      ? buildRing("negative", negatives.toSorted(byMagnitude), maxSlicesPerRing)
      : null;

  if (positiveRing === null && negativeRing === null) return null;
  if (positiveRing === null) return { inner: negativeRing!, outer: null };
  if (negativeRing === null) return { inner: positiveRing, outer: null };

  const negativeIsBigger = Math.abs(negativeRing.total) > positiveRing.total;
  return negativeIsBigger
    ? { inner: negativeRing, outer: positiveRing }
    : { inner: positiveRing, outer: negativeRing };
}
