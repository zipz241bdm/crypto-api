import { CoinsExplorerContainer } from "./components/containers/CoinsExplorerContainer";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Section } from "./components/layout/Section";
import { Counter } from "./components/widgets/Counter";
import { ThemeToggle } from "./components/widgets/ThemeToggle";

function App() {
  return (
    <DashboardLayout>
      <Section title="Controls">
        <div className="flex flex-wrap gap-4">
          <ThemeToggle />
          <Counter label="Watchlist Size" initialValue={0} step={1} />
        </div>
      </Section>
      <CoinsExplorerContainer />
    </DashboardLayout>
  );
}

export default App;
