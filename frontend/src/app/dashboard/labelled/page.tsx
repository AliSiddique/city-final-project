import LabelledImages from "@/components/app/dashboard/Labelledimage"
import { getBackendDetails } from "@/lib/utils"
import { cookies } from "next/headers"
import React from "react"

type Props = {}

export default async function page({}: Props) {
    const files = await getBackendDetails(
        cookies().get("token")?.value!,
        "api/get-labelled-image"
    )
    return (
        <div>
            <LabelledImages files={files.data} />
        </div>
    )
}
