"use client"
import { Fragment, useState } from "react"
import { Dialog, Menu, Transition } from "@headlessui/react"
import { UserCircleIcon } from "@heroicons/react/24/solid"

import {
    Bars3BottomLeftIcon,
    CogIcon,
    HeartIcon,
    HomeIcon,
    PhotoIcon,
    RectangleStackIcon,
    Squares2X2Icon as Squares2X2IconOutline,
    UserGroupIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline"
import {
    Bars4Icon,
    MagnifyingGlassIcon,
    PencilIcon,
    PlusIcon,
    Squares2X2Icon as Squares2X2IconMini,
} from "@heroicons/react/20/solid"
import { toast } from "sonner"

const navigation = [
    { name: "Home", href: "#", icon: HomeIcon, current: false },
    {
        name: "All Files",
        href: "#",
        icon: Squares2X2IconOutline,
        current: false,
    },
    { name: "Photos", href: "#", icon: PhotoIcon, current: true },
    { name: "Shared", href: "#", icon: UserGroupIcon, current: false },
    { name: "Albums", href: "#", icon: RectangleStackIcon, current: false },
    { name: "Settings", href: "#", icon: CogIcon, current: false },
]
const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
]
const tabs = [
    { name: "Recently Viewed", href: "#", current: true },
    { name: "Recently Added", href: "#", current: false },
    { name: "Favorited", href: "#", current: false },
]
const files = [
    {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        current: true,
    },
    {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        current: true,
    },
    {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        current: true,
    },
    {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        current: true,
    },
    {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        current: true,
    },
    {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        current: true,
    },
    {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        current: true,
    },
    {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        current: true,
    },
    {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        current: true,
    },
    {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        current: true,
    },
    {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        current: true,
    },
    {
        name: "IMG_4985.HEIC",
        size: "3.9 MB",
        source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
        current: true,
    },
    // More files...
]
const currentFile = {
    name: "IMG_4985.HEIC",
    size: "3.9 MB",
    source: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80",
    information: {
        "Uploaded by": "Marie Culver",
        Created: "June 8, 2020",
        "Last modified": "June 8, 2020",
        Dimensions: "4032 x 3024",
        Resolution: "72 x 72",
    },
    sharedWith: [
        {
            id: 1,
            name: "Aimee Douglas",
            imageUrl:
                "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80",
        },
        {
            id: 2,
            name: "Andrea McMillan",
            imageUrl:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        },
    ],
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

export default function Upload({ token }: { token: string }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [image, setImage] = useState<any>([])
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append("image", image)
        formData.append("name", name)

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
            await fetch(`http://127.0.0.1:8000/api/photo`, requestOptions)
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
        } else {
            console.log("Token is undefined. Cannot make the fetch request.")
        }
        setLoading(false)
    }

    return (
        <div className="mx-auto max-w-7xl">
            <input
                type="file"
                onChange={(e) => setImage(e?.target?.files?.[0])}
            />
            <button onClick={handleSubmit}>Submit</button>
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be
                            careful what you share.
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
                                            placeholder="janesmith"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="about"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    About
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={""}
                                    />
                                </div>
                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Write a few sentences about yourself.
                                </p>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon
                                        className="h-12 w-12 text-gray-300"
                                        aria-hidden="true"
                                    />
                                    <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Cover photo
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <PhotoIcon
                                            className="mx-auto h-12 w-12 text-gray-300"
                                            aria-hidden="true"
                                        />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">
                                                or drag and drop
                                            </p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
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
