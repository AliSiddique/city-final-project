import { BASEURL } from "@/API/APIRoute"
import AnalyticsChart from "@/components/AnalyticsChart"
import axios from "axios"
import { cookies } from "next/headers"
import React from "react"

type Props = {}
const getAnalytics = async () => {
    const token = cookies().get("token")
    const res = await axios.get(`${BASEURL}/api/analytics`, {
        headers: {
            Authorization: `Token ${token?.value}`,
        },
    })

    return res.data
}
export default async function page({}: Props) {
    const analytics = await getAnalytics()
    console.log(analytics)
    return (
        <div>
            <AnalyticsChart data={analytics} />
        </div>
    )
}
