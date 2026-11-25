import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
import { IconButton } from "../../atoms/IconButton/IconButton";
import { Stack } from "../../atoms/Stack/Stack";
import { Text } from "../../atoms/Text/Text";
import { TextLink } from "../../atoms/TextLink/TextLink";
import { DataTable, type DataTableColumn, type DataTableSortState } from "./DataTable";

interface DemoCoin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: string;
}

type DemoSortKey = "rank" | "name" | "price" | "change24h";

const DEMO_ROWS: DemoCoin[] = [
  {
    id: "bitcoin",
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: 94250,
    change24h: 3.12,
    marketCap: "$1.9T",
  },
  {
    id: "ethereum",
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: 3420,
    change24h: -1.45,
    marketCap: "$412.0B",
  },
  {
    id: "solana",
    rank: 3,
    name: "Solana",
    symbol: "SOL",
    price: 215,
    change24h: 6.78,
    marketCap: "$102.4B",
  },
];

function createColumns(
  favorites: Set<string>,
  onToggleFavorite: (id: string) => void,
): DataTableColumn<DemoCoin, DemoSortKey>[] {
  return [
    {
      id: "favorite",
      header: "Favorite",
      hideHeader: true,
      align: "left",
      cell: (coin) => {
        const active = favorites.has(coin.id);
        return (
          <IconButton
            label={`Favorite ${coin.name}`}
            tone="favorite"
            pressed={active}
            onClick={() => onToggleFavorite(coin.id)}
          >
            {active ? "★" : "☆"}
          </IconButton>
        );
      },
    },
    {
      id: "rank",
      header: "#",
      align: "left",
      sortKey: "rank",
      cell: (coin) => (
        <Text as="span" size="sm" numeric>
          {coin.rank}
        </Text>
      ),
    },
    {
      id: "coin",
      header: "Coin",
      align: "left",
      sortKey: "name",
      cell: (coin) => (
        <Stack direction="row" gap="xs" align="center">
          <TextLink to={`/coin/${coin.id}`} weight="medium">
            {coin.name}
          </TextLink>
          <Text as="span" size="xs" tone="muted" uppercase>
            {coin.symbol}
          </Text>
        </Stack>
      ),
    },
    {
      id: "price",
      header: "Price",
      align: "right",
      sortKey: "price",
      cell: (coin) => `$${coin.price.toLocaleString("en-US")}`,
    },
    {
      id: "change-24h",
      header: "24h %",
      align: "right",
      sortKey: "change24h",
      cell: (coin) => (
        <Text as="span" size="sm" tone={coin.change24h >= 0 ? "success" : "danger"} numeric>
          {`${coin.change24h >= 0 ? "+" : ""}${coin.change24h.toFixed(2)}%`}
        </Text>
      ),
    },
    {
      id: "market-cap",
      header: "Market Cap",
      align: "right",
      cell: (coin) => coin.marketCap,
    },
  ];
}

function InteractiveDataTable({ onRowClick }: { onRowClick: (row: DemoCoin) => void }) {
  const [sort, setSort] = useState<DataTableSortState<DemoSortKey>>({
    key: "rank",
    direction: "asc",
  });
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set(["bitcoin"]));

  const toggleSort = (key: DemoSortKey) => {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: key === "rank" || key === "name" ? "asc" : "desc" },
    );
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const sortedRows = useMemo(() => {
    const factor = sort.direction === "asc" ? 1 : -1;
    return DEMO_ROWS.toSorted((a, b) => {
      const left = a[sort.key];
      const right = b[sort.key];
      if (typeof left === "string" && typeof right === "string") {
        return left.localeCompare(right) * factor;
      }
      return (Number(left) - Number(right)) * factor;
    });
  }, [sort]);

  const columns = useMemo(() => createColumns(favorites, toggleFavorite), [favorites]);

  return (
    <DataTable
      columns={columns}
      rows={sortedRows}
      getRowKey={(row) => row.id}
      caption="Coins by market cap"
      sort={sort}
      onSort={toggleSort}
      onRowClick={onRowClick}
    />
  );
}

const DEFAULT_COLUMNS = createColumns(new Set(["bitcoin"]), () => {});

const meta = {
  title: "Organisms/DataTable",
  component: DataTable,
  args: {
    columns: DEFAULT_COLUMNS,
    rows: DEMO_ROWS,
    getRowKey: (row) => row.id,
    caption: "Coins by market cap",
    sort: { key: "rank", direction: "asc" },
    busy: false,
    onSort: fn(),
    onRowClick: fn(),
  },
} satisfies Meta<typeof DataTable<DemoCoin, DemoSortKey>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Busy: Story = {
  args: {
    busy: true,
  },
};

export const Interactive: Story = {
  render: (args) => <InteractiveDataTable onRowClick={args.onRowClick ?? fn()} />,
  play: async ({ args, canvas, userEvent }) => {
    const changeHeaderButton = canvas.getByRole("button", { name: "24h %" });
    await userEvent.click(changeHeaderButton);
    await expect(changeHeaderButton.closest("th")).toHaveAttribute("aria-sort", "descending");

    const favoriteButton = canvas.getByRole("button", { name: "Favorite Ethereum" });
    await userEvent.click(favoriteButton);
    await expect(favoriteButton).toHaveAttribute("aria-pressed", "true");
    await expect(args.onRowClick).not.toHaveBeenCalled();

    await userEvent.click(canvas.getByText("$94,250"));
    await expect(args.onRowClick).toHaveBeenCalledTimes(1);
  },
};
