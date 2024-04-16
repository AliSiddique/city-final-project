"use client"
import { FormEvent, useState } from "react"
import { UserCircleIcon } from "@heroicons/react/24/solid"

import { toast } from "sonner"
import { BASEURL } from "@/API/APIRoute"
import { Image } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList } from "./ui/tabs"
import { TabsTrigger } from "./ui/tabs"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

export default function Upload({ token }: { token: string }) {
    const [image, setImage] = useState<any>(null)
    const [multiple, setMultiple] = useState<any>([])

    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState("")
    const handleSubmit = async (e: FormEvent) => {
        const toastId = toast.loading("Uploading image...")
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append("image", image)
        formData.append("name", name)
        formData.append("description", description)

        if (token) {
            var requestOptions: any = {
                method: "POST",
                body: formData,
                redirect: "follow",
                "Content-type": "multipart/form-data",
                headers: {
                    Authorization: `Token ${token}`,
                },
            }

            // Now you can proceed with the fetch request using requestOptions
            await fetch(`${BASEURL}/api/photo`, requestOptions)
                .then((response) => {
                    response.text()
                    //   window.location.reload()
                })
                .then((result) => {
                    toast.success("Image uploaded successfully")
                    console.log(result)
                    // window.location.reload()
                })
                .catch((error) => console.log("error", error))
            toast.success("Image uploaded successfully", {
                id: toastId,
            })
        } else {
            toast.error("Error uploading image", {
                id: toastId,
            })
        }
        setLoading(false)
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Accessing files from the event
        const files = e.target.files

        // Convert FileList to an array if files exist
        const filesArray = files ? Array.from(files) : []

        // Update state with the array of files
        setMultiple(filesArray)
    }

    const handleMultiple = async (e: FormEvent) => {
        const toastId = toast.loading("Uploading image...")
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        multiple?.map((file: File, index: number) => {
            formData.append(`images[${index}]`, file)
        })
        formData.append("name", name)
        formData.append("description", description)

        if (token) {
            var requestOptions: any = {
                method: "POST",
                body: formData,
                redirect: "follow",
                "Content-type": "multipart/form-data",
                headers: {
                    Authorization: `Token ${token}`,
                },
            }

            // Now you can proceed with the fetch request using requestOptions
            await fetch(`${BASEURL}/api/upload-multiple`, requestOptions)
                .then((response) => {
                    response.text()
                    //   window.location.reload()
                })
                .then((result) => {
                    toast.success("Image uploaded successfully")
                    console.log(result)
                    // window.location.reload()
                })
                .catch((error) => console.log("error", error))
            toast.success("Image uploaded successfully", {
                id: toastId,
            })
        } else {
            toast.error("Error uploading image", {
                id: toastId,
            })
        }
        setLoading(false)
    }
    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="one">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="one">All</TabsTrigger>
                        <TabsTrigger value="multiple">Multiple</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="one">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                                    Upload an image
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Upload an image.
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="username"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    autoComplete="username"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="cool image name"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="about"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">
                                            Write a description for your image.
                                        </p>
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="photo"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Image
                                        </label>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            {/* {image ? (
                                        <img
                                            src={URL.createObjectURL(image && image[0])}
                                            alt="profile"
                                            className="h-28 w-28 rounded-full"
                                        />
                                    
                                    ): (
                                        <UserCircleIcon
                                            className="h-28 w-28 text-gray-300"
                                            aria-hidden="true"
                                        />
                                    
                                    )} */}

                                            <input
                                                type="file"
                                                onChange={(e) =>
                                                    setImage(
                                                        e?.target?.files?.[0]
                                                    )
                                                }
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Button
                                asChild
                                type="button"
                                className="text-sm font-semibold leading-6 "
                            >
                                <Link href="/dashboard">Cancel</Link>
                            </Button>
                            <Button
                                disabled={loading}
                                type="submit"
                                className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </TabsContent>
                <TabsContent value="multiple">
                    <form onSubmit={handleMultiple}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                                    Upload an image
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Upload an image.
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="username"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    autoComplete="username"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="cool image name"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="about"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="about"
                                                name="about"
                                                rows={3}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">
                                            Write a description for your image.
                                        </p>
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="photo"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Image
                                        </label>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            {image ? (
                                                // <img
                                                //     src={URL.createObjectURL(image && image[0])}
                                                //     alt="profile"

                                                //     className="h-28 w-28 rounded-full"
                                                // />
                                                <h1 className="text-2xl font-semibold text-gray-900">
                                                    Multiple images
                                                </h1>
                                            ) : (
                                                <UserCircleIcon
                                                    className="h-28 w-28 text-gray-300"
                                                    aria-hidden="true"
                                                />
                                            )}

                                            <input
                                                type="file"
                                                multiple
                                                onChange={handleFileChange}
                                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Button
                                asChild
                                type="button"
                                className="text-sm font-semibold leading-6 "
                            >
                                <Link href="/dashboard">Cancel</Link>
                            </Button>
                            <Button
                                disabled={loading}
                                type="submit"
                                className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </Button>
                        </div>
                    </form>{" "}
                </TabsContent>
            </Tabs>
        </div>
    )
}

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
