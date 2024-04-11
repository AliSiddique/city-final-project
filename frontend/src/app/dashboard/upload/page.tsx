import Upload from "@/components/Upload"
import { cookies } from "next/headers"
import React from "react"

type Props = {}

export default function page({}: Props) {
    const token = cookies().get("token")?.value
    return (
        <div>
            <Upload token={token!} />
        </div>
    )
}
