import {expect, test} from "@playwright/test";

test("이미지 업로드 후 canvas 렌더링 확인", async ({ page }) => {
  await page.goto("http://localhost:3000/editor");

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles("texts/fixtures/sample.webp");

  const canvas = page.locator("canvas");
  await expect(canvas).toBeVisible();

  const size = await canvas.evaluate<{ width: number; height: number }>((c: HTMLCanvasElement) => {
    return {
      width: c.width,
      height: c.height,
    };
  });

  console.log("canvas size:", size);

  expect(size.width).toBeGreaterThan(0);
  expect(size.height).toBeGreaterThan(0);
});
