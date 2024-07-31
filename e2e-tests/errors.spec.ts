import { test, expect } from "@playwright/test";
test.describe("Errors", () => {
  test("Handles page not found", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    const title = await page.title();
    expect(title).toBe("Not found");
    await page.getByRole("heading", { name: "Not found" }).isVisible();
  });

  test("Handles item not found", async ({ page }) => {
    await page.goto("/item/789079273489472390432");
    const title = await page.title();
    expect(title).toBe("Item not found");
    await page.getByRole("heading", { name: "Not found" }).isVisible();
  });
});
