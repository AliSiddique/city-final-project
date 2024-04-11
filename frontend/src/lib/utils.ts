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
        timeZone: "UTC", // Or your desired timezone
    }

    return new Intl.DateTimeFormat("en-US", options).format(datess)
}
