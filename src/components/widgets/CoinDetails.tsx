import {
  Avatar,
  Badge,
  Grid,
  Heading,
  Panel,
  Stack,
  StatList,
  Text,
  type StatListItem,
} from "../../design-system";
import type { CoinMarket } from "../../types/coingecko";
import {
  formatChange,
  formatCompactUsd,
  formatDate,
  formatDateTime,
  formatNumber,
  formatSignedUsd,
  formatUsd,
  getChangeTone,
} from "../../utils/format";
import { FavoriteButton } from "./FavoriteButton";

export interface CoinDetailsProps {
  coin: CoinMarket;
}

function ChangeText({ value, size = "sm" }: { value: number | null; size?: "sm" | "md" }) {
  return (
    <Text as="span" size={size} weight="medium" tone={getChangeTone(value)} numeric>
      {formatChange(value)}
    </Text>
  );
}

export function CoinDetails({ coin }: CoinDetailsProps) {
  const marketItems: StatListItem[] = [
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

  const dayItems: StatListItem[] = [
    { label: "24h high", value: formatUsd(coin.high_24h) },
    { label: "24h low", value: formatUsd(coin.low_24h) },
    { label: "Price change", value: formatSignedUsd(coin.price_change_24h) },
    { label: "Price change (%)", value: <ChangeText value={coin.price_change_percentage_24h} /> },
  ];

  const supplyItems: StatListItem[] = [
    { label: "Circulating supply", value: formatNumber(coin.circulating_supply) },
    { label: "Total supply", value: formatNumber(coin.total_supply) },
    { label: "Max supply", value: formatNumber(coin.max_supply) },
  ];

  const recordItems: StatListItem[] = [
    { label: "All-time high", value: `${formatUsd(coin.ath)} (${formatDate(coin.ath_date)})` },
    { label: "From all-time high", value: <ChangeText value={coin.ath_change_percentage} /> },
    { label: "All-time low", value: `${formatUsd(coin.atl)} (${formatDate(coin.atl_date)})` },
    { label: "From all-time low", value: <ChangeText value={coin.atl_change_percentage} /> },
  ];

  return (
    <Stack as="article" gap="lg">
      <Stack direction="row" align="center" justify="between" gap="md" wrap>
        <Stack direction="row" align="center" gap="md" wrap>
          <Avatar src={coin.image} alt="" size="lg" />
          <Stack gap="2xs">
            <Stack direction="row" align="center" gap="xs" wrap>
              <Heading level={2} size="2xl">
                {coin.name}
              </Heading>
              <Badge size="sm" tone="neutral">
                {coin.symbol.toUpperCase()}
              </Badge>
            </Stack>
            <Text size="sm" tone="muted">
              Market cap rank #{coin.market_cap_rank ?? "-"}
            </Text>
          </Stack>
          <FavoriteButton coinId={coin.id} coinName={coin.name} />
        </Stack>

        <Stack gap="2xs" align="end">
          <Text size="3xl" weight="semibold" numeric>
            {formatUsd(coin.current_price)}
          </Text>
          <Text weight="medium" numeric>
            <ChangeText value={coin.price_change_percentage_24h} size="md" /> (24h)
          </Text>
        </Stack>
      </Stack>

      <Grid columns={1} mdColumns={2} gap="md">
        <Panel title="Market" headingLevel={3}>
          <StatList items={marketItems} />
        </Panel>
        <Panel title="Last 24 hours" headingLevel={3}>
          <StatList items={dayItems} />
        </Panel>
        <Panel title="Supply" headingLevel={3}>
          <StatList items={supplyItems} />
        </Panel>
        <Panel title="All-time records" headingLevel={3}>
          <StatList items={recordItems} />
        </Panel>
      </Grid>

      <Text size="xs" tone="muted">
        Last updated: {formatDateTime(coin.last_updated)}
      </Text>
    </Stack>
  );
}
