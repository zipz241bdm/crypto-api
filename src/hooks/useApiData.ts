import { useEffect, useState } from "react";
import { isAbortError } from "../api/client";

export type AsyncState<T> =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: unknown };

export type UseApiDataResult<T> = AsyncState<T> & { reload: () => void };

const LOADING_STATE = { status: "loading", data: null, error: null } as const;

/**
 * Loads data once on mount (and again on `reload`).
 *
 * `fetcher` must be referentially stable (a module-level function or a memoized callback),
 * otherwise the effect re-runs on every render and requests loop forever.
 */
export function useApiData<T>(fetcher: (signal: AbortSignal) => Promise<T>): UseApiDataResult<T> {
  const [state, setState] = useState<AsyncState<T>>(LOADING_STATE);
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetcher(controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setState({ status: "success", data, error: null });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted || isAbortError(error)) return;
        setState({ status: "error", data: null, error });
      });

    return () => controller.abort();
  }, [fetcher, reloadCount]);

  const reload = () => {
    setState(LOADING_STATE);
    setReloadCount((count) => count + 1);
  };

  return { ...state, reload };
}
