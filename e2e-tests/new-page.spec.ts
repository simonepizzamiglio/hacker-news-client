import { test, expect } from "@playwright/test";

const URL = "https://hacker-news-client-inky.vercel.app/";

test("Redirects to /new", async ({ page }) => {
  await page.goto(URL);
  await expect(page).toHaveURL(`${URL}/new`);
  await page.getByRole("heading", { name: "New", exact: true }).isVisible();
});
