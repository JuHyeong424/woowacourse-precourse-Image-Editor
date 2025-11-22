import { test, expect } from "@playwright/test";
import {loadEditorAndImage, getPixel, waitForCanvasUpdate} from "../utils/canvas";

test("Vignette 필터 적용 테스트", async ({ page }) => {
  await loadEditorAndImage(page);
  const before = await getPixel(page);

  const slider = await page.getByTestId("vignette-slider");
  await slider.fill("50");

  await waitForCanvasUpdate(page);

  const after = await getPixel(page);

  const diff =
    Math.abs(after[0] - before[0]) +
    Math.abs(after[1] - before[1]) +
    Math.abs(after[2] - before[2]);

  expect(diff).toBeGreaterThan(2);
});
