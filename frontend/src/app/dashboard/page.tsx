import React from "react"
import { cookies } from "next/headers"
import DashboardTable from "@/components/app/dashboard/DashboardTable"
import { getBackendDetails } from "@/lib/utils"
import { redirect } from "next/navigation"

type Props = {}

export default async function page({}: Props) {
    const token = cookies().get("token")?.value
    const files = await getBackendDetails(
        cookies().get("token")?.value!,
        "api/users-photos"
    )

    return <DashboardTable token={token!} files={files} />
}
