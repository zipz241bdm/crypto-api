import {
  Avatar,
  DataTable,
  Stack,
  Text,
  TextLink,
  type DataTableColumn,
  type DataTableSortState,
} from "../../design-system";
import { coinPath } from "../../router/paths";
import type { CoinMarket } from "../../types/coingecko";
import type { CoinSortKey } from "../../types/dashboard";
import { formatChange, formatCompactUsd, formatUsd, getChangeTone } from "../../utils/format";
import { FavoriteButton } from "./FavoriteButton";

const COLUMNS: DataTableColumn<CoinMarket, CoinSortKey>[] = [
  {
    id: "favorite",
    header: "Favorite",
    hideHeader: true,
    align: "left",
    cell: (coin) => <FavoriteButton coinId={coin.id} coinName={coin.name} />,
  },
  {
    id: "rank",
    header: "#",
    align: "left",
    sortKey: "market_cap_rank",
    cell: (coin) => coin.market_cap_rank ?? "-",
  },
  {
    id: "coin",
    header: "Coin",
    align: "left",
    sortKey: "name",
    cell: (coin) => (
      <Stack direction="row" gap="xs" align="center">
        <Avatar src={coin.image} alt="" size="sm" />
        <TextLink to={coinPath(coin.id)} tone="default" weight="medium">
          {coin.name}
        </TextLink>
        <Text as="span" size="sm" tone="muted" uppercase>
          {coin.symbol}
        </Text>
      </Stack>
    ),
  },
  {
    id: "price",
    header: "Price",
    align: "right",
    sortKey: "current_price",
    cell: (coin) => formatUsd(coin.current_price),
  },
  {
    id: "change-24h",
    header: "24h %",
    align: "right",
    sortKey: "price_change_percentage_24h",
    cell: (coin) => (
      <Text as="span" size="sm" tone={getChangeTone(coin.price_change_percentage_24h)} numeric>
        {formatChange(coin.price_change_percentage_24h)}
      </Text>
    ),
  },
  {
    id: "market-cap",
    header: "Market Cap",
    align: "right",
    sortKey: "market_cap",
    cell: (coin) => formatCompactUsd(coin.market_cap),
  },
  {
    id: "volume",
    header: "24h Volume",
    align: "right",
    cell: (coin) => formatCompactUsd(coin.total_volume),
  },
];

export interface CoinsTableProps {
  coins: CoinMarket[];
  sortState: DataTableSortState<CoinSortKey>;
  onSort: (key: CoinSortKey) => void;
  onSelectCoin: (coinId: string) => void;
  busy?: boolean;
}

export function CoinsTable({
  coins,
  sortState,
  onSort,
  onSelectCoin,
  busy = false,
}: CoinsTableProps) {
  return (
    <DataTable
      columns={COLUMNS}
      rows={coins}
      getRowKey={(coin) => coin.id}
      caption="Coins by market cap"
      sort={sortState}
      onSort={onSort}
      onRowClick={(coin) => onSelectCoin(coin.id)}
      busy={busy}
    />
  );
}
