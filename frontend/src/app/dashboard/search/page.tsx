"use client"
import { BASEURL } from '@/API/APIRoute'
import PhotosTable from '@/components/PhotosTable'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}

export default function page({}: Props) {
    const search = useSearchParams()
    const query = search.get('query')
    const [data, setData] = React.useState([])
    useEffect(() => {
       const fetchData = async () => {
              const res = await fetch(`${BASEURL}/api/search-photos?query=${query}`)
                const data = await res.json()
                console.log(data)
                setData(data)

            }
            fetchData()

    }, [query])
  return (
    <div>
      <PhotosTable files={data} />
    </div>
  )
}