import LogTable from "@/components/app/dashboard/LogTable"
import { getBackendDetails } from "@/lib/utils"
import { cookies } from "next/headers"
import React from "react"

type Props = {}

export default async function page({}: Props) {
    const logs = await getBackendDetails(cookies().get("token")?.value!, "api/users-logs")
    return (
        <div>
            <LogTable logs={logs} />
        </div>
    )
}
