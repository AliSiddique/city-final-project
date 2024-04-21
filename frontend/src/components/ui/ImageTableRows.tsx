import React, { useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "./badge"
import { Button } from "./button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { formattedDate } from "@/lib/utils"
import axios from "axios"
import { BASEURL } from "@/API/APIRoute"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
type Props = {
    files: FileData[]
}
interface FileData {
    name: string
    image: string
    uploaded_at: string
    id: string
    tag?: string
    isLabelled?: boolean
}

export default function ImageTableRows({ files }: Props) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleDelete = async (id: string) => {
        try {
            const res = await axios.delete(`${BASEURL}/api/delete-photo/${id}`)
            toast.success("Image deleted successfully")
            files = files.filter((file: FileData) => file.id !== id)
            router.refresh()
        } catch (error) {
            toast.error("Error deleting image")
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Images</CardTitle>
                    <CardDescription>Manage your images</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Tag</TableHead>

                                <TableHead className="hidden md:table-cell">
                                    Created at
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {files.map((file: FileData) => (
                                <TableRow key={file.id}>
                                    <TableCell className="hidden sm:table-cell">
                                        <Link
                                            href={`/dashboard/images/${file.id}`}
                                        >
                                            <img
                                                alt="Product image"
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={file.image}
                                                width="64"
                                            />
                                        </Link>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {file.name.charAt(0).toUpperCase() +
                                            file.name.slice(1)}
                                    </TableCell>
                                    <TableCell>
                                        {file.isLabelled ? (
                                            <Badge
                                                variant="secondary"
                                                className="bg-green-500 text-white"
                                            >
                                                Labelled
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive">
                                                Not Labelled
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {file.tag != "draft" ? (
                                            <Badge
                                                variant="secondary"
                                                className="bg-green-500 text-white"
                                            >
                                                Labelled
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive">
                                                Draft
                                            </Badge>
                                        )}
                                    </TableCell>

                                    <TableCell className="hidden md:table-cell">
                                        {formattedDate(file.uploaded_at)}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Toggle menu
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>
                                                    Actions
                                                </DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDelete(file.id)
                                                    }
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <div className="text-xs text-muted-foreground">
                        <strong>{files.length}</strong> Images
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
