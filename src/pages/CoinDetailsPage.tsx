import { useParams } from "react-router";
import { CoinDetailsContainer } from "../components/containers/CoinDetailsContainer";
import { BackLink } from "../components/widgets/BackLink";
import { NotFoundState, Stack } from "../design-system";

export function CoinDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <Stack gap="md">
      <BackLink />
      {id ? (
        <CoinDetailsContainer key={id} id={id} />
      ) : (
        <NotFoundState title="Coin not found" message="No coin id was provided." />
      )}
    </Stack>
  );
}
