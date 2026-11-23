import type { PieRing, PieRings } from "../types/dashboard";

export interface RingCaption {
  sign: PieRing["sign"];
  text: string;
}

export function describeRings(
  rings: PieRings,
  valueFormatter: (value: number) => string,
): RingCaption[] {
  const { inner, outer } = rings;

  if (outer === null) {
    return [
      {
        sign: inner.sign,
        text: `All values are ${inner.sign}. Slices show each coin's share of the total ${valueFormatter(inner.total)}`,
      },
    ];
  }

  const describe = (ring: PieRing) => `${ring.sign} values, total ${valueFormatter(ring.total)}`;
  return [
    { sign: inner.sign, text: `Inner circle: ${describe(inner)}` },
    { sign: outer.sign, text: `Outer ring: ${describe(outer)}` },
  ];
}
