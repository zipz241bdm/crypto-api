import type { ReactNode } from "react";
import type { CoinMarket } from "../../types/coingecko";
import type { CoinSortKey } from "../../types/dashboard";
import { formatChange, formatCompactUsd, formatUsd, getChangeColor } from "../../utils/format";
import type { SortState } from "../../utils/sort";
import { SortableHeader } from "./SortableHeader";

interface Column {
  id: string;
  label: string;
  align: "left" | "right";
  sortKey?: CoinSortKey;
  render: (coin: CoinMarket) => ReactNode;
}

const COLUMNS: Column[] = [
  {
    id: "rank",
    label: "#",
    align: "left",
    sortKey: "market_cap_rank",
    render: (coin) => coin.market_cap_rank ?? "-",
  },
  {
    id: "coin",
    label: "Coin",
    align: "left",
    sortKey: "name",
    render: (coin) => (
      <div className="flex items-center gap-2">
        <img
          src={coin.image}
          alt=""
          width={24}
          height={24}
          loading="lazy"
          className="h-6 w-6 rounded-full"
        />
        <span className="font-medium">{coin.name}</span>
        <span className="text-gray-500 uppercase">{coin.symbol}</span>
      </div>
    ),
  },
  {
    id: "price",
    label: "Price",
    align: "right",
    sortKey: "current_price",
    render: (coin) => formatUsd(coin.current_price),
  },
  {
    id: "change-24h",
    label: "24h %",
    align: "right",
    sortKey: "price_change_percentage_24h",
    render: (coin) => (
      <span className={getChangeColor(coin.price_change_percentage_24h)}>
        {formatChange(coin.price_change_percentage_24h)}
      </span>
    ),
  },
  {
    id: "market-cap",
    label: "Market Cap",
    align: "right",
    sortKey: "market_cap",
    render: (coin) => formatCompactUsd(coin.market_cap),
  },
  {
    id: "volume",
    label: "24h Volume",
    align: "right",
    render: (coin) => formatCompactUsd(coin.total_volume),
  },
];

export interface CoinsTableProps {
  coins: CoinMarket[];
  sortState: SortState<CoinSortKey>;
  onSort: (key: CoinSortKey) => void;
}

export function CoinsTable({ coins, sortState, onSort }: CoinsTableProps) {
  return (
    <div className="overflow-x-auto rounded border">
      <table className="w-full min-w-160 text-sm">
        <caption className="sr-only">Coins by market cap</caption>
        <thead className="border-b">
          <tr>
            {COLUMNS.map((column) =>
              column.sortKey ? (
                <SortableHeader
                  key={column.id}
                  label={column.label}
                  sortKey={column.sortKey}
                  sortState={sortState}
                  onSort={onSort}
                  align={column.align}
                />
              ) : (
                <th
                  key={column.id}
                  scope="col"
                  className={`px-3 py-2 font-medium ${column.align === "right" ? "text-right" : "text-left"}`}
                >
                  {column.label}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id}
              className="border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {COLUMNS.map((column) => (
                <td
                  key={column.id}
                  className={`px-3 py-2 ${column.align === "right" ? "text-right" : "text-left"}`}
                >
                  {column.render(coin)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
