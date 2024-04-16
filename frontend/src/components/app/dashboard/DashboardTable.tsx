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
import { downloadJSON, formattedDate } from "@/lib/utils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import TableLoading from "@/components/ui/TableLoading"
type FileData = {
    name: string
    image: string
    uploaded_at: string
    id: string
    tag?: string
    isLabelled?: boolean
}

type Props = {
    token: string
    files: FileData[] | []
}

export default function DashboardTable({ token, files }: Props) {
    const draftFiles = files?.filter((file: FileData) => file.tag == "draft")
    const labelledFiles = files?.filter(
        (file: FileData) => file.isLabelled == true
    )
    const archivedFiles = files?.filter(
        (file: FileData) => file.tag == "archived"
    )
    const [loading, setLoading] = React.useState(false)
    const router = useRouter()

    const downloadCSV = () => {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            "Name,URL,Uploaded at,ID\n" +
            files
                ?.map(
                    (file: FileData) =>
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

    const convertFilesToXML = (files: any) => {
        let xmlData = '<?xml version="1.0" encoding="UTF-8"?>\n<files>\n'
        files.forEach((file: any) => {
            xmlData += `<file name="${file.name}" URL="${file.image}" UploadedAt="${formattedDate(file.uploaded_at)}" Id="${file.id}"/>\n`
        })
        xmlData += "</files>"
        return xmlData
    }
    async function labelAll() {
        setLoading(true)
        try {
            const res = await axios.post(`${BASEURL}/api/label-all`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            const data = res.data
            toast.success(data.message)
            setLoading(false)
            router.refresh()
        } catch (error) {
            toast.error("Error labelling images")
            setLoading(false)
        }
    }
    const downloadXML = () => {
        // Assuming you have a function to convert 'files' into XML format
        const xmlData = convertFilesToXML(files)

        const blob = new Blob([xmlData], { type: "application/xml" })
        const url = URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "user_list.xml")

        document.body.appendChild(link)

        link.click()

        // Clean up
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }
    const downloadText = () => {
        const textData = files
            ?.map(
                (file: FileData) =>
                    `${file.name},${file.image},${formattedDate(file.uploaded_at)},${file.id}`
            )
            .join("\n")

        const blob = new Blob([textData], { type: "text/plain" })
        const url = URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", "user_list.txt")

        document.body.appendChild(link)

        link.click()

        // Clean up
        URL.revokeObjectURL(url)
        document.body.removeChild(link)
    }

    return (
        <div>
            {loading && <TableLoading />}
            {!loading && (
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="labelled">
                                    Labelled
                                </TabsTrigger>
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
                                    onClick={labelAll}
                                    size="sm"
                                    variant="outline"
                                    className="h-7 gap-1"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Label All
                                    </span>
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 gap-1"
                                        >
                                            <File className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Export
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            Format
                                        </DropdownMenuLabel>
                                        <DropdownMenuItem
                                            onClick={() =>
                                                downloadJSON("images", files)
                                            }
                                        >
                                            JSON
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={downloadText}
                                        >
                                            Text
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={downloadCSV}>
                                            CSV
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={downloadXML}>
                                            XML
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button asChild size="sm" className="h-7 gap-1">
                                    <Link href="/dashboard/upload">
                                        <PlusCircle className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Add Image
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
            )}
        </div>
    )
}
