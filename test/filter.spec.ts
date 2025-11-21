import {expect, test} from "@playwright/test";

test("흑백 필터 적용 시 픽셀 값 변화 확인", async ({ page }) => {
  await page.goto("http://localhost:3000/editor");

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles("tests/fixtures/sample.webp");

  const canvas = page.locator("canvas");
  await expect(canvas).toBeVisible();

  await page.getByRole("button", { name: "흑백 필터" }).click();

  const pixel = await canvas.evaluate((c: HTMLCanvasElement) => {
    const ctx = c.getContext("2d");
    const { data } = ctx.getImageData(10, 10, 1, 1);
    return Array.from(data);
  })
  console.log("픽셀 변화:", pixel);

  expect(pixel[0]).toBe(pixel[1]);
  expect(pixel[1]).toBe(pixel[2]);
});
