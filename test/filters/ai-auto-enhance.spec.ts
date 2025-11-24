import { test, expect } from "@playwright/test";
import path from "path";

test.describe("AI 자동 보정(E2E 전체 흐름)", () => {
  test("AI 자동 보정 전체 플로우 검증", async ({ page }) => {
    let mockFail = false;

    await page.route("**/api/aiAutoEnhance", async (route) => {
      if (mockFail) {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({ error: "AI 필터 분석 실패" }),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          brightness: 150,
          contrast: 110,
          saturation: 80,
        }),
      });
    });

    await page.goto("/editor");

    const fileInput = page.locator('input[type="file"]');
    const SAMPLE = path.join(__dirname, "..", "fixtures/sample.webp");
    await fileInput.setInputFiles(SAMPLE);

    await expect(page.locator("canvas")).toBeVisible();

    const aiButton = page.getByRole("button", { name: "AI 자동 보정" });
    await aiButton.click();

    await expect(aiButton).toHaveText(/보정/);

    const brightness = page.locator("#brightness");
    const contrast = page.locator("#contrast");
    const saturation = page.locator("#saturation");

    expect(Number(await brightness.inputValue())).not.toBe(100);
    expect(Number(await contrast.inputValue())).not.toBe(100);
    expect(Number(await saturation.inputValue())).not.toBe(100);

    mockFail = true;

    const aiButton2 = page.getByRole("button", { name: "AI 자동 보정" });
    await aiButton2.click();

    const errorAlert = page.getByText("AI 필터 분석 실패");
    await expect(errorAlert).toBeVisible();

    await expect(aiButton2).toBeEnabled();
  });
});
