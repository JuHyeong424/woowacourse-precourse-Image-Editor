import { test, expect } from "@playwright/test";
import { loadEditorAndImage, getPixel } from "../utils/canvas";

test("Brightness 필터 적용 테스트", async ({ page }) => {
  await loadEditorAndImage(page);
  const before = await getPixel(page);

  const slider = await page.getByTestId("brightness-slider");
  await slider.fill("50");

  const after = await getPixel(page);

  expect(after[0]).not.toBe(before[0]);
});
