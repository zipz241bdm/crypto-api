import { CoinsExplorerContainer } from "../components/containers/CoinsExplorerContainer";
import { Section } from "../components/layout/Section";
import { Counter } from "../components/widgets/Counter";

export function HomePage() {
  return (
    <>
      <Section title="Watchlist">
        <Counter label="Watchlist Size" initialValue={0} step={1} />
      </Section>
      <CoinsExplorerContainer />
    </>
  );
}
