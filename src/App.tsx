import { useState } from "react";
import { CoinsExplorerContainer } from "./components/containers/CoinsExplorerContainer";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Section } from "./components/layout/Section";
import { Counter } from "./components/widgets/Counter";
import { ThemeToggle } from "./components/widgets/ThemeToggle";
import type { ThemeMode } from "./types/dashboard";

function App() {
  const [mode, setMode] = useState<ThemeMode>("light");

  const handleToggle = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <DashboardLayout mode={mode}>
      <Section title="Controls">
        <div className="flex flex-wrap gap-4">
          <ThemeToggle mode={mode} onToggle={handleToggle} />
          <Counter label="Watchlist Size" initialValue={0} step={1} />
        </div>
      </Section>
      <CoinsExplorerContainer />
    </DashboardLayout>
  );
}

export default App;
