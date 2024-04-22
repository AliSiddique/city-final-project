"use client"
import { useState } from "react"
import {HeartIcon} from "@heroicons/react/24/outline"
import {
    Bars4Icon,
    PencilIcon,
    Squares2X2Icon as Squares2X2IconMini,
} from "@heroicons/react/20/solid"
import { Button } from "@/components/ui/button"
import Link from "next/link"


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formattedDate } from "@/lib/utils"
import { CheckIcon } from "lucide-react"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}
interface File {
    id: string
    labelled_image: string
    label: number
    confidence: string
    isSegmented: boolean
    uploaded_at: string
    prediction_time: string
    image: string
}
interface Props {
    files: File[]
}

export default function LabelledImages({ files }: Props) {
    const [currentFile, setCurrentFile] = useState<File>(files[0])
// Get the current date
const currentDate = new Date();

// Calculate the date 7 days prior to the current date
const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

// Assuming `files` is an array of objects with an `uploaded_at` property representing the upload date
const recentlyLabelled = files.filter((file) => {
    // Convert file's upload date string to a Date object
    const uploadDate = new Date(file.uploaded_at);

    // Check if the upload date is within the last 7 days
    return uploadDate > sevenDaysAgo;
});
    return (
            <div className="flex h-full">
                <div className="flex flex-1 flex-col overflow-hidden">
                    <div className="flex flex-1 items-stretch overflow-hidden">
                    <Tabs defaultValue="recentlylabelled" >

                        <main className="flex-1 overflow-y-auto">
                            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                                <div className="flex">
                                    <h1 className="flex-1 text-2xl font-bold text-gray-900">
                                        Photos
                                    </h1>
                                    <div className="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
                                        <button
                                            type="button"
                                            className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                        >
                                            <Bars4Icon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            <span className="sr-only">
                                                Use list view
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                        >
                                            <Squares2X2IconMini
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            <span className="sr-only">
                                                Use grid view
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="mt-3 sm:mt-2">
                                    <div className="sm:hidden">
                                        <label
                                            htmlFor="tabs"
                                            className="sr-only"
                                        >
                                            Select a tab
                                        </label>
                                        <select
                                            id="tabs"
                                            name="tabs"
                                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                            defaultValue="Recently Viewed"
                                        >
                                            <option>Recently Viewed</option>
                                            <option>All</option>
                                        </select>
                                    </div>
                                    <div className="hidden sm:block">
                                        <div className="flex items-center border-b border-gray-200">


                                            <nav
                                                className="-mb-px flex flex-1 space-x-6 xl:space-x-8"
                                                aria-label="Tabs"
                                            >
                                        <TabsList>
                                            <TabsTrigger value="recentlylabelled">Recently Labelled</TabsTrigger>
                                            <TabsTrigger value="all">All</TabsTrigger>

                                        </TabsList>

                                               
                                            </nav>
                                         
                                        </div>
                                    </div>
                                </div>

                                <TabsContent value="recentlylabelled">

                                <section
                                    className="mt-8 pb-16"
                                    aria-labelledby="gallery-heading"
                                >
                                    <h2
                                        id="gallery-heading"
                                        className="sr-only"
                                    >
                                        Recently Labelled
                                    </h2>

                                    <ul
                                        key={currentFile.id}
                                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                                    >
                                        {recentlyLabelled.map((file: File) => (
                                            <li
                                                key={Math.random()}
                                                className="relative"
                                            >
                                                <div
                                                    onClick={() =>
                                                        setCurrentFile(file)
                                                    }
                                                   
                                                >
                                                    <img
                                                        src={file.labelled_image}
                                                        alt={file.labelled_image}
                                                        className="object-cover w-72 h-72 rounded-lg"
                                                       
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-0 focus:outline-none"
                                                    >
                                                        <span className="sr-only">
                                                            View details for{" "}
                                                            {file.labelled_image}
                                                        </span>
                                                    </button>
                                                </div>
                                               
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                                </TabsContent>
                                <TabsContent value="all">

<section
    className="mt-8 pb-16"
    aria-labelledby="gallery-heading"
>
    <h2
        id="gallery-heading"
        className="sr-only"
    >
        Recently viewed
    </h2>

    <ul
        key={currentFile.id}
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
    >
        {files.map((file: File) => (
            <li
                key={Math.random()}
                className="relative"
            >
                <div
                    onClick={() =>
                        setCurrentFile(file)
                    }
                    
                >
                    <img
                        src={file.labelled_image}
                        alt={file.labelled_image}
                        className="object-cover w-72 h-72 rounded-lg"
                        
                    />
                    <button
                        type="button"
                        className="absolute inset-0 focus:outline-none"
                    >
                        <span className="sr-only">
                            View details for{" "}
                            {file.labelled_image}
                        </span>
                    </button>
                </div>
               
               
            </li>
        ))}
    </ul>
</section>
</TabsContent>
                            </div>
                        </main>
                        </Tabs>

                        <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white p-8 lg:block">
                            <div className="space-y-6 pb-16">
                                <div>
                                    <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
                                        <img
                                            src={currentFile.labelled_image}
                                            alt={currentFile.labelled_image}
                                            className="object-cover h-80 w-72 "
                                        />
                                    </div>
                                    <div className="mt-4 flex items-start justify-between">
                                        <div>
                                            <Link href={currentFile.labelled_image} target="_blank" className="text-lg font-medium text-accent-foreground underline">
                                                
                                                Original image
                                            </Link>
                                          
                                        </div>
                                        <button
                                            type="button"
                                            className="relative ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            {currentFile.isSegmented ? (
                                                <CheckIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <PencilIcon
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                         
                                            <span className="sr-only">
                                                Favorite
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">
                                        Information
                                    </h3>
                                    <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                                        <div className="flex justify-between py-3 text-sm font-medium">
                                            <dt className="text-gray-500">Date uploaded</dt>
                                            <dd className="whitespace-nowrap text-gray-900">
                                                {formattedDate(currentFile.uploaded_at)}
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                       
                                <div className="flex gap-x-3">
                                    <Button
                                        asChild
                                        type="button"
                                        className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        <Link
                                            target="_blank"
                                            href={currentFile.labelled_image}
                                        >
                                            Download
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
    )
}
