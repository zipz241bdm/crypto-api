const BASE_URL = "https://api.coingecko.com/api/v3";

const DEMO_API_KEY = import.meta.env.VITE_COINGECKO_DEMO_KEY as string | undefined;

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

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, signal } = options;

  const query = params ? buildQuery(params) : "";
  const url = `${BASE_URL}${path}${query ? `?${query}` : ""}`;

  const headers: Record<string, string> = { Accept: "application/json" };
  if (DEMO_API_KEY) {
    headers["x-cg-demo-api-key"] = DEMO_API_KEY;
  }

  let response: Response;
  try {
    response = await fetch(url, { headers, signal });
  } catch (error) {
    if (isAbortError(error)) throw error;
    throw new ApiError("Could not reach CoinGecko. Wait a minute and try again.", null, error);
  }

  if (!response.ok) {
    throw new ApiError(`Request failed with status ${response.status}.`, response.status);
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    if (isAbortError(error)) throw error;
    throw new ApiError("The server returned an invalid response.", response.status, error);
  }
}
