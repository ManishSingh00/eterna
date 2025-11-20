import type { TokenCategory, TokenSortField } from "./types";

export const CATEGORY_TABS: {
  id: TokenCategory;
  label: string;
  description: string;
}[] = [
  { id: "new_pairs", label: "New Pairs", description: "Fresh launches in the last 48h" },
  {
    id: "final_stretch",
    label: "Final Stretch",
    description: "Approaching major milestones",
  },
  {
    id: "migrated",
    label: "Migrated",
    description: "Recently bridged ecosystems",
  },
];

type SortableColumn = {
  key: TokenSortField;
  label: string;
  tooltip: string;
  isNumeric?: boolean;
};

type ActionColumn = {
  key: "actions";
  label: string;
  tooltip: string;
  isNumeric?: boolean;
};

export type TableColumn = SortableColumn | ActionColumn;

export const TABLE_COLUMNS: TableColumn[] = [
  { key: "name", label: "Token", tooltip: "Token identity and network" },
  { key: "price", label: "Price", tooltip: "Last traded price (USD)", isNumeric: true },
  {
    key: "priceChange24h",
    label: "24h",
    tooltip: "Percentage change over 24 hours",
    isNumeric: true,
  },
  {
    key: "liquidityUSD",
    label: "Liquidity",
    tooltip: "Total liquidity in USD",
    isNumeric: true,
  },
  { key: "ageDays", label: "Age", tooltip: "Age of the pair in days", isNumeric: true },
  {
    key: "actions",
    label: "Actions",
    tooltip: "Quick actions, analytics, and pinning",
  },
];
