import { fetchGlobal } from "../api/coingecko";
import type { GlobalResponse } from "../types/coingecko";
import { useApiData } from "./useApiData";

/** Market-wide stats (GET /global). */
export function useGlobalStats() {
  return useApiData<GlobalResponse>(fetchGlobal);
}
