import type { ReactNode } from "react";
import { Button } from "../../atoms/Button/Button";
import { Grid, type GridColumns } from "../../atoms/Grid/Grid";

export interface FilterBarProps {
  /** Accessible label for the search landmark (`aria-label`). */
  label?: string;
  /** Filter fields rendered inside the responsive grid. */
  children: ReactNode;
  /** Called when the reset button is clicked. */
  onReset: () => void;
  /** Disables the reset button when filters are already at defaults. */
  resetDisabled?: boolean;
  /** Label for the reset button. */
  resetLabel?: string;
  /** Number of columns at the `lg` breakpoint. */
  columns?: GridColumns;
}

export function FilterBar({
  label = "Filters",
  children,
  onReset,
  resetDisabled = false,
  resetLabel = "Reset filters",
  columns = 6,
}: FilterBarProps) {
  return (
    <form
      role="search"
      aria-label={label}
      onSubmit={(event) => event.preventDefault()}
    >
      <Grid columns={1} smColumns={2} lgColumns={columns} gap="md" align="end">
        {children}
        <Button variant="secondary" disabled={resetDisabled} onClick={onReset}>
          {resetLabel}
        </Button>
      </Grid>
    </form>
  );
}
