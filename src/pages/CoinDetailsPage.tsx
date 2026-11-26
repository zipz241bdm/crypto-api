import { useParams } from "react-router";
import { CoinDetailsContainer } from "../components/containers/CoinDetailsContainer";
import { NotFoundState } from "../components/feedback/NotFoundState";
import { BackLink } from "../components/widgets/BackLink";

export function CoinDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col gap-4">
      <BackLink />
      {id ? (
        <CoinDetailsContainer key={id} id={id} />
      ) : (
        <NotFoundState title="Coin not found" message="No coin id was provided." />
      )}
    </div>
  );
}
