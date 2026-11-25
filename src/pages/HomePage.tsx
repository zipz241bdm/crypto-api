import { CoinsExplorerContainer } from "../components/containers/CoinsExplorerContainer";
import { Counter } from "../components/widgets/Counter";
import { Panel, Stack } from "../design-system";

export function HomePage() {
  return (
    <Stack gap="lg">
      <Panel title="Watchlist">
        <Counter label="Watchlist Size" initialValue={0} step={1} />
      </Panel>
      <CoinsExplorerContainer />
    </Stack>
  );
}
