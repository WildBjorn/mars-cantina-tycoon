import { test, expect } from '@playwright/test';

// This smoke test verifies that the production build of the app loads and
// contains a Phaser canvas element. It relies on the `webServer` configuration
// defined in playwright.config.ts to start the preview server.
test('loads the game canvas', async ({ page }) => {
  // Navigate to the base URL defined in the config
  await page.goto('/');
  // Wait for the canvas element that Phaser inserts into the DOM
  const canvas = await page.$('canvas');
  expect(canvas).not.toBeNull();
});
