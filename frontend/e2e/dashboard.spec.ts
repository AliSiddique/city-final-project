import { BASEURL } from "@/API/APIRoute"
import { test, expect } from "@playwright/test"
import axios from "axios"

test("Get photos", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    const res = await fetch(`${BASEURL}/api/users-photos`, {
        cache: "no-store",
        headers: {
            Authorization: `Token 5a7aaf9f3631f10105f087a218287374324eba55`,
        },
    })

    const data = await res.json()
    console.log(data)
    expect(res.status).toBe(200)
})
