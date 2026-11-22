interface NotFoundStateProps {
  title: string;
  message: string;
}

export function NotFoundState({ title, message }: NotFoundStateProps) {
  return (
    <div className="grid place-items-center gap-1 py-8 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
}
