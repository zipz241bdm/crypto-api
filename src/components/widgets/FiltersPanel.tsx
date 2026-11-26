import { Controller } from "react-hook-form";
import { CATEGORY_OPTIONS, LIMIT_OPTIONS, ORDER_OPTIONS } from "../../constants/filterOptions";
import { useFilters } from "../../hooks/useFilters";
import { SelectField } from "../form/SelectField";
import { TextField } from "../form/TextField";

export function FiltersPanel() {
  const { control, isDirty, resetFilters } = useFilters();

  return (
    <form
      role="search"
      aria-label="Coin filters"
      onSubmit={(e) => e.preventDefault()}
      className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-5"
    >
      <Controller
        control={control}
        name="search"
        render={({ field }) => (
          <TextField
            label="Search"
            placeholder="Name or symbol"
            description="Searches the loaded coins"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <SelectField
            label="Category"
            options={CATEGORY_OPTIONS}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="order"
        render={({ field }) => (
          <SelectField
            label="Rank by"
            options={ORDER_OPTIONS}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="limit"
        render={({ field }) => (
          <SelectField
            label="Show"
            options={LIMIT_OPTIONS}
            value={field.value}
            onChange={field.onChange}
          />
        )}
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
