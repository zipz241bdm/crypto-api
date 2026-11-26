interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = "Loading..." }: LoadingStateProps) {
  return (
    <div className="grid place-items-center gap-2 py-8" role="status">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-black motion-reduce:animate-none dark:border-neutral-700 dark:border-t-white"
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
}
