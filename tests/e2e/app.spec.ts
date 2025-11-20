import { test, expect } from "@playwright/test";

test.describe("Pulse discovery table", () => {
  test("sorts, opens popover, and shows modal", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("Token discovery radar")).toBeVisible();

    const priceHeader = page.getByRole("button", { name: /price/i }).first();
    await priceHeader.click();
    await priceHeader.click();

    const firstRow = page.getByRole("row").nth(1);
    await expect(firstRow).toBeVisible();

    await firstRow.getByRole("button", { name: /actions/i }).click();
    await expect(page.getByText("Open analytics")).toBeVisible();

    await firstRow.click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.getByRole("button", { name: /close modal/i }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});
