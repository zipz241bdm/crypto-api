import { getErrorMessage } from "../../api/client";
import { ErrorState, LoadingState, NotFoundState } from "../../design-system";
import { useCoinDetails } from "../../hooks/useCoinDetails";
import { CoinDetails } from "../widgets/CoinDetails";

export interface CoinDetailsContainerProps {
  id: string;
}

export function CoinDetailsContainer({ id }: CoinDetailsContainerProps) {
  const { data, loading, error, reload } = useCoinDetails(id);

  if (loading && data === null) {
    return <LoadingState label="Loading coin..." />;
  }

  if (error !== null) {
    return <ErrorState message={getErrorMessage(error)} onRetry={reload} />;
  }

  if (data === null) {
    return (
      <NotFoundState title="Coin not found" message={`There is no coin with the id "${id}".`} />
    );
  }

  return <CoinDetails coin={data} />;
}
