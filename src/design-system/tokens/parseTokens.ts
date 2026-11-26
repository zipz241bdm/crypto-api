export interface Token {
  name: string;
  value: string;
}

export interface ParsedTokens {
  palette: Token[];
  theme: Token[];
  dark: Token[];
}

export function parseTokens(css: string): ParsedTokens {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const result: ParsedTokens = { palette: [], theme: [], dark: [] };

  let position = 0;
  while (position < source.length) {
    const open = source.indexOf("{", position);
    if (open === -1) break;

    const selector = source.slice(position, open).trim();
    let depth = 1;
    let end = open + 1;
    while (end < source.length && depth > 0) {
      if (source[end] === "{") depth += 1;
      else if (source[end] === "}") depth -= 1;
      end += 1;
    }

    const body = source.slice(open + 1, end - 1);
    const target =
      selector === ":root"
        ? result.palette
        : selector.startsWith("@theme")
          ? result.theme
          : selector === ":root.dark"
            ? result.dark
            : null;

    if (target) {
      for (const match of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) {
        target.push({ name: match[1], value: match[2].trim() });
      }
    }
    position = end;
  }

  return result;
}
