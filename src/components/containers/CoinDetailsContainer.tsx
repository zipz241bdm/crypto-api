import { getErrorMessage } from "../../api/client";
import { useCoinDetails } from "../../hooks/useCoinDetails";
import { ErrorState } from "../feedback/ErrorState";
import { LoadingState } from "../feedback/LoadingState";
import { NotFoundState } from "../feedback/NotFoundState";
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
