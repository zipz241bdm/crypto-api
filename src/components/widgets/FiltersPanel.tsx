import { CATEGORY_OPTIONS, LIMIT_OPTIONS, ORDER_OPTIONS } from "../../constants/filterOptions";
import {
  selectFilters,
  selectIsFiltersDirty,
  selectResetFilters,
  selectSetFilter,
} from "../../store/selectors";
import { useAppStore } from "../../store/useAppStore";
import { CheckboxField } from "../form/CheckboxField";
import { SelectField } from "../form/SelectField";
import { TextField } from "../form/TextField";

export function FiltersPanel() {
  const filters = useAppStore(selectFilters);
  const setFilter = useAppStore(selectSetFilter);
  const resetFilters = useAppStore(selectResetFilters);
  const isDirty = useAppStore(selectIsFiltersDirty);

  return (
    <form
      role="search"
      aria-label="Coin filters"
      onSubmit={(e) => e.preventDefault()}
      className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-6"
    >
      <TextField
        label="Search"
        placeholder="Name or symbol"
        description="Searches the loaded coins"
        value={filters.search}
        onChange={(value) => setFilter("search", value)}
      />
      <SelectField
        label="Category"
        options={CATEGORY_OPTIONS}
        value={filters.category}
        onChange={(value) => setFilter("category", value)}
      />
      <SelectField
        label="Rank by"
        options={ORDER_OPTIONS}
        value={filters.order}
        onChange={(value) => setFilter("order", value)}
      />
      <SelectField
        label="Show"
        options={LIMIT_OPTIONS}
        value={filters.limit}
        onChange={(value) => setFilter("limit", value)}
      />
      <CheckboxField
        label="Favorites only"
        checked={filters.favoritesOnly}
        onChange={(checked) => setFilter("favoritesOnly", checked)}
      />
      <button
        type="button"
        onClick={resetFilters}
        disabled={!isDirty}
        className="cursor-pointer rounded border px-3 py-2 hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-inherit dark:hover:bg-white dark:hover:text-black"
      >
        Reset filters
      </button>
    </form>
  );
}
