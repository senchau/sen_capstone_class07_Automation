import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // ----- Global timeout -----
  timeout: 180000, // tối đa 3 phút / test

  // ----- Expect timeout -----
  expect: {
    timeout: 30000, // 10 giây cho mỗi expect
  },

  // ----- Test folder -----
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // ----- Reporter -----
  reporter: [
    ["list"], // hiển thị tiến trình test trên terminal
    ["html", { outputFolder: "playwright-report", open: "never" }], // báo cáo HTML mặc định
  ],

  // ----- Default settings for all tests -----
  use: {
    baseURL: "https://demo1.cybersoft.edu.vn/",
    headless: true, // đổi thành false nếu muốn thấy trình duyệt khi debug

    screenshot: "only-on-failure", // 🖼️ chụp khi fail
    video: "retain-on-failure", // 🎥 lưu video khi fail
    trace: "retain-on-failure", // 🧵 lưu trace khi fail

    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    navigationTimeout: 20000,
  },

  // ----- Browsers -----
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  // ----- Local dev server (optional) -----
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
