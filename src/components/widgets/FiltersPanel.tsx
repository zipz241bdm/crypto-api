import { CATEGORY_OPTIONS, LIMIT_OPTIONS, ORDER_OPTIONS } from "../../constants/filterOptions";
import { CheckboxField, FilterBar, FormField, Input, Select } from "../../design-system";
import {
  selectFilters,
  selectIsFiltersDirty,
  selectResetFilters,
  selectSetFilter,
} from "../../store/selectors";
import { useAppStore } from "../../store/useAppStore";

export function FiltersPanel() {
  const filters = useAppStore(selectFilters);
  const setFilter = useAppStore(selectSetFilter);
  const resetFilters = useAppStore(selectResetFilters);
  const isDirty = useAppStore(selectIsFiltersDirty);

  return (
    <FilterBar label="Coin filters" resetDisabled={!isDirty} onReset={resetFilters}>
      <FormField label="Search">
        {(controlProps) => (
          <Input
            {...controlProps}
            type="search"
            placeholder="Name or symbol"
            aria-description="Searches the loaded coins"
            value={filters.search}
            onValueChange={(value) => setFilter("search", value)}
          />
        )}
      </FormField>
      <FormField label="Category">
        {(controlProps) => (
          <Select
            {...controlProps}
            options={CATEGORY_OPTIONS}
            value={filters.category}
            onValueChange={(value) => setFilter("category", value)}
          />
        )}
      </FormField>
      <FormField label="Rank by">
        {(controlProps) => (
          <Select
            {...controlProps}
            options={ORDER_OPTIONS}
            value={filters.order}
            onValueChange={(value) => setFilter("order", value)}
          />
        )}
      </FormField>
      <FormField label="Show">
        {(controlProps) => (
          <Select
            {...controlProps}
            options={LIMIT_OPTIONS}
            value={filters.limit}
            onValueChange={(value) => setFilter("limit", value)}
          />
        )}
      </FormField>
      <CheckboxField
        label="Favorites only"
        checked={filters.favoritesOnly}
        onCheckedChange={(checked) => setFilter("favoritesOnly", checked)}
      />
    </FilterBar>
  );
}
