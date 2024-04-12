"use client"
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
import axios from "axios"
import Link from "next/link"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { BASEURL } from "@/API/APIRoute"
import ImageTableRows from "@/components/ui/ImageTableRows"
type Props = {
    files: any
}

export default function DashboardTable({ files }: Props) {
    const draftFiles = files.filter((file: any) => file.tag == "draft")
    const labelledFiles = files.filter((file: any) => file.isLabelled == true)
    const archivedFiles = files.filter((file: any) => file.tag == "archived")

   

    const downloadCSV = () => {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            "Name,URL,Uploaded at,Id\n" +
            files
                .map(
                    (file: any) =>
                        `"${file.name}",${file.image},${formattedDate(file.uploaded_at)},${file.id}\n`
                )
                .join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "user_list.csv")
        document.body.appendChild(link)
        link.click()
    }
    // const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    function formattedDate(dates: any) {
        const datess = new Date(dates)
        const options: any = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "UTC", // Or your desired timezone
        }

        return new Intl.DateTimeFormat("en-US", options).format(datess)
    }
    return (
        <div>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="labelled">Labelled</TabsTrigger>
                            <TabsTrigger value="draft">Draft</TabsTrigger>
                            <TabsTrigger
                                value="archived"
                                className="hidden sm:flex"
                            >
                                Archived
                            </TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex items-center gap-2">
                            <Button
                                onClick={downloadCSV}
                                size="sm"
                                variant="outline"
                                className="h-7 gap-1"
                            >
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Export
                                </span>
                            </Button>
                            <Button asChild size="sm" className="h-7 gap-1">
                                <Link href="/dashboard/upload">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Add Product
                                    </span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="all">
                       <ImageTableRows files={files} />
                    </TabsContent>
                    <TabsContent value="draft">
                        <ImageTableRows files={draftFiles} />
                    </TabsContent>
                    <TabsContent value="labelled">
                        <ImageTableRows files={labelledFiles} />
                    </TabsContent>
                    <TabsContent value="archived">
                        <ImageTableRows files={archivedFiles} />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
