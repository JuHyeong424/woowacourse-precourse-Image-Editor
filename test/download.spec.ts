import {expect, test} from "@playwright/test";

test("다운로드 버튼 클릭 시 파일이 생성되는지 확인", async ({ page }) => {
  await page.goto("http://localhost:3000/editor");

  const fileInput = page.locator('input[type="file"]');
  await fileInput.setInputFiles("test/fixtures/sample.webp");

  await expect(page.locator("canvas")).toBeVisible();

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "이미지 다운로드" }).click();
  const download = await downloadPromise;

  const filePath = await download.path();
  console.log("다운로드 완료:", filePath);

  expect(filePath).not.toBeNull();
});
