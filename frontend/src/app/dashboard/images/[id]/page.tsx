
import { BASEURL } from '@/API/APIRoute'
import SingleImage from '@/components/SingleImage'
import axios from 'axios'
import { cookies } from 'next/headers'
import React from 'react'

type Props = {
    params: {
        id: string
    
    }
}
const getSinglePhoto = async (id:string) => {
    const token = cookies().get('token')
   const res = await axios.get(`${BASEURL}/api/get-photo/${id}`, {
            headers: {
              Authorization: `Token ${token?.value}`,
            },
          })
  
    return res.data
  }
export default async function page({params}: Props) {
    const image = await getSinglePhoto(params.id)
    const token = cookies().get('token')

    
  return (
    <div>
        <SingleImage token={token?.value ?? ""} file={image} />
    </div>
  )
}