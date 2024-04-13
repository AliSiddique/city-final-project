"use client"

import LogView from "./LogView"
import React, { useState } from "react"
import { Badge } from "../../ui/badge"
import { downloadJSON, formattedDate } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { File } from "lucide-react"
type LogFormat =
    | "image.uploaded"
    | "image.labelled.success"
    | "image.comment"
    | "image.analytics"
    | "image.delete"
    | "image.labelled.failed"

interface Logs {
    id: string
    log: LogFormat
    created_at: string
    method: string
    url: string
}

type LogColor = {
    [key in LogFormat]: string
}

const logColors: LogColor = {
    "image.uploaded": "bg-green-500",
    "image.labelled.success": "bg-green-500",
    "image.comment": "purple",
    "image.analytics": "orange",
    "image.delete": "red",
    "image.labelled.failed": "yellow",
}

export default function LogTable({ logs }: { logs: Logs[] }) {
    const [open, setOpen] = useState(false)
    const convertFilesToXML = (logs: Logs[]) => {
        let xmlData = '<?xml version="1.0" encoding="UTF-8"?>\n<files>\n'
        logs.forEach((log: Logs) => {
            xmlData += `<file ID="${log.id}" Log="${log.log}" CreatedAt="${formattedDate(log.created_at)}" Method="${log.method} URL="${log.url}"/>\n`
        })
        xmlData += "</files>"
        return xmlData
    }

    const downloadXML = () => {
        // Assuming you have a function to convert 'files' into XML format
        const xmlData = convertFilesToXML(logs)

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
    const downloadCSV = () => {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            "ID,Log,Date,Method,URL\n" +
            logs
                .map(
                    (log: Logs) =>
                        `"${log.id}",${log.log},${formattedDate(log.created_at)},${log.method},${log.url}\n`
                )
                .join("\n")

        const encodedUri = encodeURI(csvContent)
        const link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "user_logs.csv")
        document.body.appendChild(link)
        link.click()
    }

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Logs
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        View all the logs for the images.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
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
                            <DropdownMenuLabel>Format</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => downloadJSON("logs", logs)}
                            >
                                JSON
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={downloadXML}>
                                XML
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                    >
                                        ID
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Log
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        URL
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Method
                                    </th>
                                    <th
                                        scope="col"
                                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                                    >
                                        Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 bg-white">
                                {logs.map((log: Logs) => (
                                    <tr key={log.id}>
                                        {open && (
                                            <LogView
                                                id={log.id}
                                                log={log.log}
                                                created_at={log.created_at}
                                                method={log.method}
                                                url={log.url}
                                                open={open}
                                                setOpen={setOpen}
                                            />
                                        )}
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                                            {log.id}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                            <Badge
                                                className={logColors[log.log]}
                                            >
                                                {log.log}
                                            </Badge>
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                                            {log.url}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                                            {log.method}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                                            {formattedDate(log.created_at)}
                                        </td>
                                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <button
                                                onClick={() => setOpen(!open)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                View
                                                <span className="sr-only">
                                                    , {log.id}
                                                </span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
