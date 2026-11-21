import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { DEFAULT_FILTERS } from "../constants/filterOptions";
import type { CoinFilters } from "../types/dashboard";

export function useCoinFilters() {
  const {
    control,
    reset,
    formState: { isDirty },
  } = useForm<CoinFilters>({ defaultValues: DEFAULT_FILTERS });

  const search = useWatch({ control, name: "search" });
  const category = useWatch({ control, name: "category" });
  const order = useWatch({ control, name: "order" });
  const limit = useWatch({ control, name: "limit" });

  const filters = useMemo<CoinFilters>(
    () => ({ search, category, order, limit }),
    [search, category, order, limit],
  );

  const resetFilters = () => reset();

  return { control, filters, isDirty, resetFilters };
}
