import AnalyticsChart from "@/components/app/dashboard/AnalyticsChart"
import { getBackendDetails } from "@/lib/utils"
import { cookies } from "next/headers"
import React from "react"

type Props = {}
export default async function page({}: Props) {
    const analytics = await getBackendDetails(
        cookies().get("token")?.value!,
        "api/analytics"
    )
    return (
        <div>
            <AnalyticsChart data={analytics} />
        </div>
    )
}
