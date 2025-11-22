import { test, expect } from "@playwright/test";
import {loadEditorAndImage, getPixel, waitForCanvasUpdate} from "../utils/canvas";

test("Vignette 필터 적용 테스트", async ({ page }) => {
  await loadEditorAndImage(page);
  const before = await getPixel(page);

  const slider = await page.getByTestId("vignette-slider");
  await slider.fill("50");

  await waitForCanvasUpdate(page);

  const after = await getPixel(page);

  expect(after).not.toEqual(before);
});
