import tokensCss from "./tokens.css?raw";
import { parseTokens } from "./parseTokens";

export const TOKENS = parseTokens(tokensCss);

export function themeTokens(prefix: string) {
  return TOKENS.theme.filter((token) => token.name.startsWith(prefix));
}
