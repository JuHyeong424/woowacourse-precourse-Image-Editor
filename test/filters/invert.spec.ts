import { test, expect } from "@playwright/test";
import { loadEditorAndImage, getPixel } from "../utils/canvas";

test("Invert 필터 적용 테스트", async ({ page }) => {
  await loadEditorAndImage(page);
  const before = await getPixel(page);

  await page.getByTestId("invert-button").click();
  const after = await getPixel(page);

  expect(after).not.toEqual(before);
});
