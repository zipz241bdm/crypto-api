import { Spinner } from "../../atoms/Spinner/Spinner";
import { Text } from "../../atoms/Text/Text";

export interface LoadingStateProps {
  /** Status message displayed below the spinner. */
  label?: string;
}

export function LoadingState({ label = "Loading..." }: LoadingStateProps) {
  return (
    <div role="status" className="grid place-items-center gap-xs py-xl text-center">
      <Spinner size="lg" />
      <Text tone="muted">{label}</Text>
    </div>
  );
}
