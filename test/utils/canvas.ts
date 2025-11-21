import { Page } from "@playwright/test";

export async function loadEditorAndImage(page: Page) {
  await page.goto("http://localhost:3000/editor");

  const fileInput = page.locator('input[type="file"]');
  const filePath = require("path").join(__dirname, "..", "fixtures", "sample.webp");

  await fileInput.setInputFiles(filePath);

  const canvas = page.locator("canvas");
  await canvas.waitFor({ state: "visible" });

  return canvas;
}

export async function getPixel(page: Page, x = 10, y = 10) {
  return await page.locator("canvas").evaluate(
    (canvas: HTMLCanvasElement, { x, y }) => {
      const ctx = canvas.getContext("2d");
      const { data } = ctx.getImageData(x, y, 1, 1);
      return Array.from(data);
    },
    { x, y }
  );
}
