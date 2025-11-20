import {
  formatAge,
  formatCurrency,
  formatLiquidity,
  formatPercent,
} from "@/utils/formatters";

describe("formatters", () => {
  it("formats currency with USD symbol", () => {
    expect(formatCurrency(1234.567)).toBe("$1,234.5670");
  });

  it("formats percent with sign", () => {
    expect(formatPercent(1.2345)).toBe("+1.23%");
    expect(formatPercent(-9.8)).toBe("-9.80%");
  });

  it("formats compact liquidity", () => {
    expect(formatLiquidity(1_500_000)).toBe("1.5M");
  });

  it("formats age in days", () => {
    expect(formatAge(7)).toBe("7d");
  });
});
