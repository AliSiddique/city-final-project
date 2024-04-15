import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { File, ListFilter, PlusCircle } from "lucide-react"
import { MoreHorizontal } from "lucide-react"
import { cookies } from "next/headers"
import axios from "axios"
import Link from "next/link"
import { formattedDate } from "@/lib/utils"
import { Skeleton } from "./skeleton"
type Props = {
    files: any
}

export default function TableLoading() {
    return (
        <div>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center">
                        <div className="ml-auto flex items-center gap-2">
                         
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 gap-1"
                                    >
                                       <Skeleton className="h-3.5 w-3.5" />
                                    </Button>
                            
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-7 gap-1"
                            >
                                    <Skeleton className="h-3.5 w-3.5" />
                            </Button>
                            <Button  size="sm" className="h-7 gap-1">
                                        <Skeleton className="h-3.5 w-3.5 rounded-full" />
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="all">
                        <Card>
                            <CardHeader>
                                    <Skeleton className="w-24 h-4 " />
                                    <Skeleton className="w-24 h-10" />
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="hidden w-[100px] sm:table-cell">
                                                <span className="sr-only">
                                                    Image
                                                </span>
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Total Sales
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">
                                                Created at
                                            </TableHead>
                                            <TableHead>
                                                <span className="sr-only">
                                                    Actions
                                                </span>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {[1,2,3,4,5,6,7].map((_, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="hidden sm:table-cell">
                                                   
                                                     
                                                        <Skeleton className="aspect-square rounded-md object-cover h-20 w-20 " /> 
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                   <Skeleton className="w-24 h-4" />
                                                </TableCell>
                                                <TableCell>
                                                        <Skeleton className="w-16 h-4" />
                                                </TableCell>
                                                <TableCell>
                                                    <Skeleton className="w-16 h-4" />
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <Skeleton className="w-16 h-4" />
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <Skeleton className="w-16 h-4"  />
                                                </TableCell>
                                              
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                            
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
