import { useState, type ChangeEvent } from "react";
import type { CoinMarket } from "../../types/coingecko";
import type { CategoryOption } from "../../types/dashboard";
import { CoinListItem } from "./CoinListItem";

const ALL_CATEGORY_VALUE = "";
const ALL_CATEGORY_NAME = "All";

export interface FilteredListProps {
  items: CoinMarket[];
  categories: CategoryOption[];
}

export function FilteredList({ items, categories }: FilteredListProps) {
  const [selectedId, setSelectedId] = useState<string>(ALL_CATEGORY_VALUE);

  const selectedCategory = categories.find((category) => category.id === selectedId);

  const visibleItems = selectedCategory
    ? items.filter((coin) => selectedCategory.coinIds.includes(coin.id))
    : items;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(e.target.value);
  };

  return (
    <div className="rounded border p-4">
      <div className="mb-3 flex items-center gap-2">
        <label htmlFor="category-filter" className="text-sm font-medium">
          Filter by category:
        </label>
        <select
          id="category-filter"
          value={selectedId}
          onChange={handleChange}
          className="rounded border px-2 py-1"
        >
          <option value={ALL_CATEGORY_VALUE}>{ALL_CATEGORY_NAME}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        {visibleItems.length === 0 ? (
          <div className="text-sm text-gray-500">No coins in this category</div>
        ) : (
          visibleItems.map((coin) => (
            <CoinListItem
              key={coin.id}
              name={coin.name}
              symbol={coin.symbol}
              currentPrice={coin.current_price}
              change24h={coin.price_change_percentage_24h}
            />
          ))
        )}
      </div>
    </div>
  );
}
