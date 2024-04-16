"use client"
import { BASEURL } from "@/API/APIRoute"
import PhotosTable from "@/components/app/dashboard/PhotosTable"
import ImageTableRows from "@/components/ui/ImageTableRows"
import Loading from "@/components/ui/LoadingSpinner"
import TableLoading from "@/components/ui/TableLoading"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import React, { Suspense, useEffect } from "react"

type Props = {}

export default function page({}: Props) {
    const search = useSearchParams()
    const [loading, setLoading] = React.useState(true)
    const query = search.get("query")
    const { isPending, error, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: () =>
            fetch(`${BASEURL}/api/search-photos?query=${query}`).then((res) =>
                res.json()
            ),
    })
    if (isPending) return <TableLoading />
    if (error) return <div>Error: {error.message}</div>
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const res = await fetch(
    //             `${BASEURL}/api/search-photos?query=${query}`
    //         )
    //         const data = await res.json()
    //         console.log(data)
    //         setData(data)
    //     }
    //     fetchData()
    // }, [query])
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
