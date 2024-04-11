import LogTable from '@/components/LogTable'
import axios from 'axios'
import { cookies } from 'next/headers'
import React from 'react'

type Props = {}
const getUsersLogs = async () => {
    const token = cookies().get('token')
   const res = await axios.get(`http://127.0.0.1:8000/api/users-logs`, {
            headers: {
              Authorization: `Token ${token?.value}`,
            },
          })

    return res.data
  }
export default async function page({}: Props) {
    const logs = await getUsersLogs()
    console.log(logs)
  return (
    <div>
        <LogTable logs={logs} />
    </div>
  )
}