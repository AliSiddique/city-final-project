import { BASEURL } from "@/API/APIRoute"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formattedDate(dates: any) {
    const datess = new Date(dates)
    const options: any = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC", 
    }

    return new Intl.DateTimeFormat("en-US", options).format(datess)
}

export async function getBackendDetails(token: string, url: string) {
    const res = await fetch(`${BASEURL}/${url}`, {
        cache: "no-store",
        headers: {
            Authorization: `Token ${token}`,
        },
    })

    const data = await res.json()
    return data
}

export const downloadJSON = (filename: string, files: any[]) => {
    const jsonData = JSON.stringify(files) // Assuming 'files' is your JSON data

    const blob = new Blob([jsonData], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `${filename}.json`)

    document.body.appendChild(link)

    link.click()

    // Clean up
    URL.revokeObjectURL(url)
    document.body.removeChild(link)
}
