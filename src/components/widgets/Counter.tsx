import { useState } from "react";

export interface CounterProps {
  label?: string;
  initialValue?: number;
  step?: number;
}

export function Counter({ label = "Counter", initialValue = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState<number>(initialValue);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => prev - step);
  const reset = () => setCount(initialValue);

  return (
    <div className="rounded border p-4">
      <div className="mb-2 text-sm text-gray-500">{label}</div>
      <div className="mb-3 text-2xl font-semibold">{count}</div>
      <div className="flex gap-2">
        <button type="button" onClick={decrement} className="rounded border px-3 py-1">
          -
        </button>
        <button type="button" onClick={increment} className="rounded border px-3 py-1">
          +
        </button>
        <button type="button" onClick={reset} className="rounded border px-3 py-1">
          Reset
        </button>
      </div>
    </div>
  );
}
