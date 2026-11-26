interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="grid place-items-center py-8 text-center text-gray-600 dark:text-gray-400">
      <p>{message}</p>
    </div>
  );
}
