import { test, expect } from "@playwright/test"

test("should navigate to the about page", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("http://localhost:3000/")
    // Find an element with the text 'About' and click on it
    await page.click("text=Login")
    // The new URL should be "/about" (baseURL is used there)
    await expect(page).toHaveURL("http://localhost:3000/user/login")
    // The new page should contain an h1 with "About"
    await expect(page.locator("h2")).toContainText("Sign in to your account")
})
