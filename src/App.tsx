import { useState } from "react";
import { mockCategories } from "./data/mockCategories";
import { mockCoins } from "./data/mockCoins";
import { mockGlobal } from "./data/mockGlobal";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Section } from "./components/layout/Section";
import { categoriesToOptions } from "./mappers/categoriesToOptions";
import { globalToKpis } from "./mappers/globalToKpis";
import { Counter } from "./components/widgets/Counter";
import { FilteredList } from "./components/widgets/FilteredList";
import { KpiCard } from "./components/widgets/KpiCard";
import { ThemeToggle } from "./components/widgets/ThemeToggle";
import type { ThemeMode } from "./types/dashboard";

const kpis = globalToKpis(mockGlobal);
const categoryOptions = categoriesToOptions(mockCategories);

function App() {
  const [mode, setMode] = useState<ThemeMode>("light");

  const handleToggle = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <DashboardLayout mode={mode}>
      <Section title="Market Overview">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} title={kpi.title} value={kpi.value} change={kpi.change} />
          ))}
        </div>
      </Section>
      <Section title="Controls">
        <div className="flex flex-wrap gap-4">
          <ThemeToggle mode={mode} onToggle={handleToggle} />
          <Counter label="Watchlist Size" initialValue={0} step={1} />
        </div>
      </Section>
      <Section title="Top Coins">
        <FilteredList items={mockCoins} categories={categoryOptions} />
      </Section>
    </DashboardLayout>
  );
}

export default App;
