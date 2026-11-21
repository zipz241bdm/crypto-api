import { useEffect, useState } from "react";
import { isAbortError } from "../api/client";

interface FetchResult<TData> {
  key: string;
  data: TData | null;
  error: unknown;
}

export interface UseFetchResult<TData> {
  data: TData | null;
  loading: boolean;
  error: unknown;
  reload: () => void;
}

/**
 * Generic data loading hook: params in, { data, loading, error } out.
 *
 * - `fetcher` MUST be referentially stable (a module-level function).
 * - `params` must be JSON-serializable. They are compared by value, so callers
 *   do not need to memoize them.
 * - When params change, the previous request is aborted and its result is ignored.
 */
export function useFetch<TData, TParams>(
  fetcher: (params: TParams, signal: AbortSignal) => Promise<TData>,
  params: TParams,
): UseFetchResult<TData> {
  const [reloadCount, setReloadCount] = useState(0);
  const [result, setResult] = useState<FetchResult<TData> | null>(null);

  const paramsKey = JSON.stringify(params);
  const requestKey = `${paramsKey}#${reloadCount}`;

  useEffect(() => {
    const controller = new AbortController();
    const key = `${paramsKey}#${reloadCount}`;

    fetcher(JSON.parse(paramsKey) as TParams, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setResult({ key, data, error: null });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || isAbortError(error)) return;
        setResult((previous) => ({ key, data: previous?.data ?? null, error }));
      });

    return () => controller.abort();
  }, [fetcher, paramsKey, reloadCount]);

  const isCurrent = result?.key === requestKey;

  return {
    data: result?.data ?? null,
    loading: !isCurrent,
    error: isCurrent ? result.error : null,
    reload: () => setReloadCount((count) => count + 1),
  };
}
