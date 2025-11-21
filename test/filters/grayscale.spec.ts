import { test, expect } from "@playwright/test";
import { loadEditorAndImage, getPixel } from "../utils/canvas";

test("Grayscale 필터 적용 테스트", async ({ page }) => {
  const canvas = await loadEditorAndImage(page);
  const before = await getPixel(page);

  await page.getByTestId("grayscale-button").click();

  const after = await getPixel(page);

  expect(after[0]).toBe(after[1]);
  expect(after[1]).toBe(after[2]);
  expect(after).not.toEqual(before);
});
