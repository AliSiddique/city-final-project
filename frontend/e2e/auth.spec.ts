import { test as setup, expect } from "@playwright/test"
import { chromium } from "@playwright/test"

// Write your test case here
setup("login and redirect to dashboard", async ({ page }) => {
    // Load the saved authentication state to restore the session.
    const browser = await chromium.launch()
    const context = await browser.newContext()
    await context.addCookies([
        {
            name: "token",
            value: "26b87e9271c9cbf84fee76e214f55827b4198a49",
            domain: "localhost",
            path: "/",
        },
    ])

    // Open the dashboard page or navigate to it.
    await page.goto("http://localhost:3000/dashboard")

    // Verify that the user is redirected to the dashboard page.
    await expect(page).toHaveURL("http://localhost:3000/dashboard")
})
