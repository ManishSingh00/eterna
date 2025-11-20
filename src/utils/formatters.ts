const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 4,
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export const formatCurrency = (value: number) => currencyFormatter.format(value);

export const formatPercent = (value: number) =>
  `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

export const formatLiquidity = (value: number) => numberFormatter.format(value);

export const formatAge = (days: number) => `${days}d`;

export const trendClass = (value: number) =>
  value >= 0 ? "text-pulse-success" : "text-pulse-danger";
