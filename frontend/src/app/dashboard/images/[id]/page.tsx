
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
   const res = await axios.get(`http://127.0.0.1:8000/api/get-photo/${id}`, {
            headers: {
              Authorization: `Token ${token?.value}`,
            },
          })
  
    return res.data
  }
export default async function page({params}: Props) {
    const image = await getSinglePhoto(params.id)
    console.log(image)
    
  return (
    <div>
        <SingleImage file={image} />
    </div>
  )
}