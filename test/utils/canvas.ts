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

export async function waitForCanvasUpdate(page: Page) {
  await page.waitForTimeout(30);
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() =>
          requestAnimationFrame(resolve)
        )
      )
  );
}

export async function getPixel(page: Page, x = 10, y = 10) {
  return await page.locator("canvas").evaluate(
    (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      const cx = Math.floor(canvas.width / 2);
      const cy = Math.floor(canvas.height / 2);

      let r = 0, g = 0, b = 0;

      let count = 0;

      for (let dx = -2; dx <=2; dx++) {
        for (let dy = -2; dy <=2; dy++) {
          const { data } = ctx.getImageData(cx + dx, cy + dy, 1, 1);
          r += data[0];
          g += data[1];
          b += data[2];
          count++;
        }
      }
      return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
    },
  );
}
