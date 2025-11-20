import { test, expect } from "@playwright/test";

const BREAKPOINTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-320", width: 320, height: 640 },
];

BREAKPOINTS.forEach(({ name, width, height }) => {
  test(`visual baseline ${name}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.getByText("Token discovery radar")).toBeVisible();
    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
    });
  });
});
