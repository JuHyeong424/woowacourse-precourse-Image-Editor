import { expect, test } from "@playwright/test";

test("WASM 모듈 필터 함수가 정상적으로 동작하는지 검사", async ({ page }) => {
  await page.goto("http://localhost:3000/editor");

  const wasmLoaded = await page.waitForFunction(() => {
    return (window as any).__wasmLoaded === true;
  });

  expect(await wasmLoaded.jsonValue()).toBe(true);
});
