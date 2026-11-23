export interface StarToggleProps {
  isActive: boolean;
  subject: string;
  onToggle: () => void;
}

export function StarToggle({ isActive, subject, onToggle }: StarToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={`Favorite ${subject}`}
      onClick={onToggle}
      className={`cursor-pointer text-xl leading-none focus-visible:outline-2 ${
        isActive ? "text-amber-500" : "text-gray-400 hover:text-amber-500"
      }`}
    >
      <span aria-hidden="true">{isActive ? "★" : "☆"}</span>
    </button>
  );
}
