import { test, expect } from "@playwright/test";
import {loadEditorAndImage, getPixel, waitForCanvasUpdate} from "../utils/canvas";

test("Blur 필터 적용 테스트", async ({ page }) => {
  await loadEditorAndImage(page);
  const before = await getPixel(page);

  await page.getByTestId("blur-button").click();
  await waitForCanvasUpdate(page);

  const after = await getPixel(page);

  expect(after).not.toEqual(before);
});
