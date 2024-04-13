import React from "react"
import { cookies } from "next/headers"
import DashboardTable from "@/components/app/dashboard/DashboardTable"
import { getBackendDetails } from "@/lib/utils"

type Props = {}

export default async function page({}: Props) {
    const files = await getBackendDetails(
        cookies().get("token")?.value!,
        "api/users-photos"
    )

    return <DashboardTable files={files} />
}
