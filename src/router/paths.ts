export const ROUTES = {
  home: "/",
  coin: "/coin/:id",
} as const;

export function coinPath(id: string): string {
  return `/coin/${encodeURIComponent(id)}`;
}
