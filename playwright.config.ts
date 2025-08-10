import { defineConfig, devices } from '@playwright/test';

// See https://playwright.dev/docs/test-configuration for detailed information
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  use: {
    // Base URL for all tests. Vite preview runs on port 4173 by default.
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4173',
    headless: true,
    trace: 'retain-on-failure',
  },
  // Configure local web server to run before tests. It relies on the `preview`
  // script defined in package.json to serve the production build. The server
  // will be reused on subsequent test runs to speed things up in CI.
  webServer: {
    command: 'npm run preview',
    port: 4173,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
  // Run tests on one desktop browser for smoke purposes. You can add more
  // browsers if needed.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});