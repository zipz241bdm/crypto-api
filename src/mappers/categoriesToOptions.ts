import type { CoinCategories } from "../types/coingecko";
import type { CategoryOption } from "../types/dashboard";

/**
 * Maps the /coins/categories response to dropdown options.
 *
 * Limitation: that endpoint only returns the top 3 coins of each category, so a
 * category can match at most 3 coins here. With the real API, membership should
 * come from /coins/markets?category=id instead of local filtering.
 */
export function categoriesToOptions(categories: CoinCategories): CategoryOption[] {
  return categories.map((category) => ({
    id: category.id,
    name: category.name,
    coinIds: category.top_3_coins_id,
  }));
}
