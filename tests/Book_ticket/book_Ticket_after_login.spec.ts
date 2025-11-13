import { expect, test } from "@playwright/test";

test("Valid buy ticket test", async ({ page }) => {
  // Helper function để log lỗi + gói từng step
  const runStep = async (stepName: string, action: () => Promise<void>) => {
    try {
      await test.step(stepName, action);
    } catch (e) {
      console.error(`❌ Failed at: ${stepName}`);
      throw e; // Dừng test tại đây nếu step fail
    }
  };

  await runStep("Step 1: Navigate to homepage", async () => {
    await page.goto("https://demo1.cybersoft.edu.vn/");
  });

  await runStep('Step 2: Click "Đăng Nhập"', async () => {
    await page.getByRole("link", { name: "Đăng Nhập" }).click();
  });

  await runStep("Step 3: Enter Username", async () => {
    await page
      .getByRole("textbox", { name: "Tài Khoản" })
      .fill("Testbb02a63727a845bc850256c55d2c1b77");
  });

  await runStep("Step 4: Enter Password", async () => {
    await page.getByRole("textbox", { name: "Mật khẩu" }).fill("Test123456@");
  });

  await runStep('Step 5: Click "Đăng Nhập" button', async () => {
    await page.getByRole("button", { name: "Đăng nhập" }).click();
  });

  await runStep("Step 6: Verify login successfully", async () => {
    await expect(
      page.getByRole("heading", { name: "Đăng nhập thành công" })
    ).toBeVisible();
  });

  await runStep("Step 7: Verify user profile visible", async () => {
    await expect(page.getByRole("link", { name: "Avatar John Kenny" })).toBeVisible();
  });

  await runStep("Step 8: Click Mua Vé at homepage", async () => {
    await page.locator("a").filter({ hasText: "C18The GentlemenQuý ông thế" }).click();
  });

  await runStep("Step 9: Click Mua Vé at detail page", async () => {
    await page.getByText("Mua vé").click();
  });

  await runStep("Step 10: Select time", async () => {
    await page.getByRole("link", { name: "-09-2021  ~  01:58" }).click();
  });

  await runStep("Step 11: Select Seat", async () => {
    const seat = page.getByRole("button", { name: "99" });
    await seat.click();
  });

  await runStep('Step 12: Click "ĐẶT VÉ" button', async () => {
    await page.getByRole("button", { name: "ĐẶT VÉ" }).click();
  });

  await runStep("Step 13: Verify booking success message", async () => {
    await expect(page.getByText("Đặt vé thành công×")).toBeVisible();
  });

  await runStep('Step 14: Click "Đồng ý" button', async () => {
    await page.getByRole("button", { name: "Đồng ý" }).click();
  });
});
