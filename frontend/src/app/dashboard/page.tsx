import React from "react"
import { cookies } from "next/headers"
import axios from "axios"
import DashboardTable from "@/components/app/dashboard/DashboardTable"
import { BASEURL } from "@/API/APIRoute"

type Props = {}
const getUsersPhotos = async () => {
    const token = cookies().get("token")
    const res = await axios.get(`${BASEURL}/api/users-photos`, {
        headers: {
            Authorization: `Token ${token?.value}`,
        },
    })

    return res.data
}
export default async function page({}: Props) {
    const files = await getUsersPhotos()
    console.log(files)

    return <DashboardTable files={files} />
}
