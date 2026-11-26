interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="grid place-items-center gap-3 py-8 text-center" role="alert">
      <div>
        <p className="mb-1 text-2xl font-semibold">An error occurred:</p>
        <p>{message}</p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="cursor-pointer rounded border px-3 py-1 hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 dark:hover:bg-white dark:hover:text-black"
      >
        Try again
      </button>
    </div>
  );
}
