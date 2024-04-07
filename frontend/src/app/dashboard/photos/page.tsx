import { BASEURL } from '@/API/APIRoute'
import Photos from '@/components/Photos'
import axios from 'axios'
import { cookies } from 'next/headers'
import React from 'react'

type Props = {}

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const getUsersPhotos = async () => {
    const token = cookies().get('token')
   const res = await axios.get(`http://127.0.0.1:8000/api/users-photos`, {
            headers: {
              Authorization: `Token ${token?.value}`,
            },
          })

    return res.data
  }
async function page({}: Props) {
  const files = await getUsersPhotos()
  return (
    <div>
        <Photos files={files} />
    </div>

  )
}

export default page