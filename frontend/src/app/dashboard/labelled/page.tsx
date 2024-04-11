import { BASEURL } from '@/API/APIRoute'
import LabelledImages from '@/components/app/dashboard/Labelledimage'
import axios from 'axios'
import { cookies } from 'next/headers'
import React from 'react'

type Props = {}
const getLabelledPhotos = async () => {
    const token = cookies().get('token')
   const res = await axios.get(`${BASEURL}/api/get-labelled-image`, {
            headers: {
              Authorization: `Token ${token?.value}`,
            },
          })

    return res.data
  }
export default async function page({}: Props) {
    const files = await getLabelledPhotos()
    console.log(files)
  return (
    <div>
        <LabelledImages files={files.labelled_images} />
    </div>
  )
}