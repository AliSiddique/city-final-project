import SingleImage from "@/components/SingleImage"
import { getBackendDetails } from "@/lib/utils"
import { cookies } from "next/headers"
import React from "react"

type Props = {
    params: {
        id: string
    }
}

export default async function page({ params }: Props) {
    const token = cookies().get("token")
    const image = await getBackendDetails(
        token?.value!,
        `api/get-photo/${params.id}`
    )

    return (
        <div>
            <SingleImage token={token?.value ?? ""} file={image} />
        </div>
    )
}
