import Photos from "@/components/app/dashboard/Photos"
import { getBackendDetails } from "@/lib/utils"
import { cookies } from "next/headers"
import React from "react"

type Props = {}

async function page({}: Props) {
    const files = await getBackendDetails(
        cookies().get("token")?.value!,
        "api/users-photos"
    )
    return (
        <div>
            <Photos files={files} />
        </div>
    )
}

export default page
