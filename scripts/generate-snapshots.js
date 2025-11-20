#!/usr/bin/env node
/**
 * Helper script to refresh Playwright visual baselines.
 */
const { execSync } = require("node:child_process");

const command = "npx playwright test tests/e2e/visual.spec.ts --update-snapshots";

try {
  execSync(command, { stdio: "inherit" });
} catch (error) {
  console.error("Failed to regenerate snapshots", error);
  process.exit(error.status ?? 1);
}
