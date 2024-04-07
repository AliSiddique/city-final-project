import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { File, ListFilter, PlusCircle } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'
import { cookies } from 'next/headers'
import axios from 'axios'
import Link from 'next/link'
import DashboardTable from '@/components/DashboardTable'


type Props = {}
const getUsersPhotos = async () => {
  const token = cookies().get('token')
 const res = await axios.get(`http://127.0.0.1:8000/api/users-photos`, {
          headers: {
            Authorization: `Token ${token?.value}`,
          },
        })

  return res.data
}
export default async function page({}: Props) {
  const files = await getUsersPhotos()
  console.log(files)

  
  
  
  return (
  <DashboardTable files={files} />
  )
}