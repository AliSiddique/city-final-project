"use client"
import { BASEURL } from "@/API/APIRoute"
import PhotosTable from "@/components/app/dashboard/PhotosTable"
import ImageTableRows from "@/components/ui/ImageTableRows"
import Loading from "@/components/ui/LoadingSpinner"
import TableLoading from "@/components/ui/TableLoading"
import { useQuery } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import { useSearchParams } from "next/navigation"
import React, { Suspense, useEffect } from "react"

type Props = {}

export default function page({}: Props) {
    const search = useSearchParams()
    const query = search.get("query")
    const token = getCookie("token")
    const { isPending, error, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: () =>
            fetch(`${BASEURL}/api/search-photos?query=${query}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }).then((res) => res.json()),
    })
    if (isPending) return <TableLoading />
    if (error) return <div>Error: {error.message}</div>
    return (
        <div>
            {isPending ? (
                <TableLoading />
            ) : (
                <Suspense fallback={<Loading />}>
                    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <ImageTableRows files={data} />
                    </div>
                </Suspense>
            )}
        </div>
    )
}
