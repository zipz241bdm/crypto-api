const BASE_URL = "https://api.coingecko.com/api/v3";

const DEMO_API_KEY = import.meta.env.VITE_COINGECKO_DEMO_KEY as string | undefined;

const CACHE_TTL_MS = 60_000;
const cache = new Map<string, { expiresAt: number; data: unknown }>();
const inFlight = new Map<string, Promise<unknown>>();

export function clearRequestCache(): void {
  cache.clear();
  inFlight.clear();
}

export class ApiError extends Error {
  readonly status: number | null;

  constructor(message: string, status: number | null = null, cause?: unknown) {
    super(message, { cause });
    this.name = "ApiError";
    this.status = status;
  }
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 429) {
      return "Rate limit exceeded. Please wait a minute and try again.";
    }
    if (error.status === 401 || error.status === 403) {
      return "Access to this data was denied. The endpoint may require an API key.";
    }
    if (error.status !== null && error.status >= 500) {
      return "CoinGecko is temporarily unavailable. Please try again later.";
    }
    return error.message;
  }
  return "Something went wrong while loading data.";
}

function buildQuery(params: object): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params) as [string, unknown][]) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      if (value.length > 0) search.set(key, value.join(","));
      continue;
    }

    search.set(key, String(value));
  }

  return search.toString();
}

interface RequestOptions {
  params?: object;
  signal?: AbortSignal;
}

function withAbort<T>(promise: Promise<T>, signal?: AbortSignal): Promise<T> {
  if (!signal) return promise;

  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(new DOMException("The request was aborted.", "AbortError"));
    if (signal.aborted) {
      onAbort();
      return;
    }
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(resolve, reject).finally(() => signal.removeEventListener("abort", onAbort));
  });
}

async function fetchJson<T>(url: string): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (DEMO_API_KEY) {
    headers["x-cg-demo-api-key"] = DEMO_API_KEY;
  }

  let response: Response;
  try {
    response = await fetch(url, { headers });
  } catch (error) {
    throw new ApiError("Could not reach CoinGecko. Wait a minute and try again.", null, error);
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}.`, response.status);
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    throw new ApiError("The server returned an invalid response.", response.status, error);
  }
}

export function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, signal } = options;

  const query = params ? buildQuery(params) : "";
  const url = `${BASE_URL}${path}${query ? `?${query}` : ""}`;

  const cached = cache.get(url);
  if (cached && cached.expiresAt > Date.now()) {
    return withAbort(Promise.resolve(cached.data as T), signal);
  }

  let pending = inFlight.get(url) as Promise<T> | undefined;
  if (!pending) {
    pending = fetchJson<T>(url)
      .then((data) => {
        cache.set(url, { expiresAt: Date.now() + CACHE_TTL_MS, data });
        return data;
      })
      .finally(() => inFlight.delete(url));
    inFlight.set(url, pending);
  }

  return withAbort(pending, signal);
}
