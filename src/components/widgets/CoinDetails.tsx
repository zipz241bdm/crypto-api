import type { CoinMarket } from "../../types/coingecko";
import {
  formatChange,
  formatCompactUsd,
  formatDate,
  formatDateTime,
  formatNumber,
  formatSignedUsd,
  formatUsd,
  getChangeColor,
} from "../../utils/format";
import { Section } from "../layout/Section";
import { StatList, type StatItem } from "./StatList";

export interface CoinDetailsProps {
  coin: CoinMarket;
}

function ChangeText({ value }: { value: number | null }) {
  return <span className={getChangeColor(value)}>{formatChange(value)}</span>;
}

export function CoinDetails({ coin }: CoinDetailsProps) {
  const marketItems: StatItem[] = [
    { label: "Market cap", value: formatCompactUsd(coin.market_cap) },
    { label: "Fully diluted valuation", value: formatCompactUsd(coin.fully_diluted_valuation) },
    { label: "24h volume", value: formatCompactUsd(coin.total_volume) },
    {
      label: "Market cap change (24h)",
      value: <ChangeText value={coin.market_cap_change_percentage_24h} />,
    },
  ];
  if (coin.roi) {
    marketItems.push({
      label: "ROI",
      value: `${coin.roi.times.toFixed(1)}x (in ${coin.roi.currency.toUpperCase()})`,
    });
  }

  const dayItems: StatItem[] = [
    { label: "24h high", value: formatUsd(coin.high_24h) },
    { label: "24h low", value: formatUsd(coin.low_24h) },
    { label: "Price change", value: formatSignedUsd(coin.price_change_24h) },
    { label: "Price change (%)", value: <ChangeText value={coin.price_change_percentage_24h} /> },
  ];

  const supplyItems: StatItem[] = [
    { label: "Circulating supply", value: formatNumber(coin.circulating_supply) },
    { label: "Total supply", value: formatNumber(coin.total_supply) },
    { label: "Max supply", value: formatNumber(coin.max_supply) },
  ];

  const recordItems: StatItem[] = [
    { label: "All-time high", value: `${formatUsd(coin.ath)} (${formatDate(coin.ath_date)})` },
    { label: "From all-time high", value: <ChangeText value={coin.ath_change_percentage} /> },
    { label: "All-time low", value: `${formatUsd(coin.atl)} (${formatDate(coin.atl_date)})` },
    { label: "From all-time low", value: <ChangeText value={coin.atl_change_percentage} /> },
  ];

  return (
    <article className="flex flex-col gap-6">
      <header className="flex flex-wrap items-center gap-4">
        <img src={coin.image} alt="" width={64} height={64} className="h-16 w-16 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold">
            {coin.name}{" "}
            <span className="text-lg font-normal text-gray-500 uppercase">{coin.symbol}</span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Market cap rank #{coin.market_cap_rank ?? "-"}
          </p>
        </div>
        <div className="ml-auto text-right">
          <div className="text-3xl font-semibold">{formatUsd(coin.current_price)}</div>
          <div className="font-medium">
            <ChangeText value={coin.price_change_percentage_24h} /> (24h)
          </div>
        </div>
      </header>

      <div className="grid gap-x-6 md:grid-cols-2">
        <Section title="Market">
          <StatList items={marketItems} />
        </Section>
        <Section title="Last 24 hours">
          <StatList items={dayItems} />
        </Section>
        <Section title="Supply">
          <StatList items={supplyItems} />
        </Section>
        <Section title="All-time records">
          <StatList items={recordItems} />
        </Section>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400">
        Last updated: {formatDateTime(coin.last_updated)}
      </p>
    </article>
  );
}
