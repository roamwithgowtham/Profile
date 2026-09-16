import { defineConfig } from "@playwright/test";
import baseConfig from "./playwright.config";

// Run the same desktop/mobile suite against built assets rather than the dev server.
// Email requests remain intercepted by the test suite; no real email is sent.
export default defineConfig({
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: "http://127.0.0.1:4173",
  },
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4173 --strictPort",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
  },
});