import { Page } from "@playwright/test";
import {READ_CENTER_PIXEL_FN, READ_SINGLE_PIXEL_FN} from "./helpers";

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

export async function getPixel(page: Page, x: number | null = null, y: number | null = null) {
  const fnCenter = READ_CENTER_PIXEL_FN;
  const fnPoint = READ_SINGLE_PIXEL_FN;

  return await page.locator("canvas").evaluate(
    (canvas, { x, y, fnCenter, fnPoint }) => {
      const readCenterPixel = eval(fnCenter);
      const readSinglePixel = eval(fnPoint);

      if (x === null || y === null) {
        return readCenterPixel(canvas);
      }
      return readSinglePixel(canvas, x, y);
    },
    { x, y, fnCenter, fnPoint }
  );
}
