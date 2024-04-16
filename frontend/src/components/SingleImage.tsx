"use client"
import { FormEvent, useEffect, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"
import { CircleUser, File, ListFilter, PlusCircle } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    CheckIcon,
    QuestionMarkCircleIcon,
    StarIcon,
} from "@heroicons/react/20/solid"
import { BASEURL } from "@/API/APIRoute"
import axios from "axios"
import { Button } from "./ui/button"
import Link from "next/link"
import { formattedDate } from "@/lib/utils"
import { Badge } from "./ui/badge"
const choices = {
    models: [
        {
            name: "Segmentation",
            description: "Segment the image",
            url: "segment-image",
        },
        {
            name: "Classification",
            description: "Classify the image",
            url: "label",
        },
    ],
}
const product = {
    name: "Everyday Ruck Snack",
    href: "#",
    price: "$220",
    description:
        "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
    imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg",
    imageAlt:
        "Light green canvas bag with black straps, handle, front zipper pouch, and drawstring top.",
    breadcrumbs: [
        { id: 1, name: "Travel", href: "#" },
        { id: 2, name: "Bags", href: "#" },
    ],
    sizes: [
        {
            name: "18L",
            description: "Perfect for a reasonable amount of snacks.",
        },
        {
            name: "20L",
            description: "Enough room for a serious amount of snacks.",
        },
    ],
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}
interface Comment {
    id: number | string
    image_id: number
    comment: string
    created_at: string
    user_id: number
}

interface Photo {
    id: number
    image: string
    description: string | null
    name: string | null
    isSegmented: boolean
    uploaded_at: string
    isLabelled: boolean
    tag: string
}

interface Props {
    token: string
    file: {
        photo: Photo
        labelled_image: string | null
        comments: Comment[]
        segmented_image: string
    }
}

export default function SingleImage({ token, file }: any) {
    console.log(file)
    const [comments, setComments] = useState<Comment[]>(file.comments ?? [])
    const [newComment, setNewComment] = useState<Comment | undefined>(undefined)
    const [selectedModel, setSelectedModel] = useState(choices.models[0])
    console.log(file)
    const addComment = async (e: FormEvent, id: string, comment: any) => {
        e.preventDefault()
        try {
            const res = await axios.post(
                `${BASEURL}/api/add-comment`,
                {
                    id: id,
                    comment: newComment,
                },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            )
            const data = res.data
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
    const [labelled_image, setLabelled_image] = useState(null)
    const handleLabel = async (e: any) => {
        e.preventDefault()
        const res = await axios.post(`${BASEURL}/api/${selectedModel.url}`, {
            id: file.photo.id,
            image: file.photo.image,
        })
        const data = res.data
        setLabelled_image(data.labelled_image)
    }

    useEffect(() => {}, [comments])

    return (
        <div className="bg-gray-50">
            {/* Mobile menu */}

            <main>
                {/* Product */}
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        {/* Product details */}
                        <div className="lg:max-w-lg lg:self-end">
                            <div className="mt-4">
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    {file?.photo?.name}
                                </h1>
                            </div>

                            <section
                                aria-labelledby="information-heading"
                                className="mt-4"
                            >
                                <h2
                                    id="information-heading"
                                    className="sr-only"
                                >
                                    Information
                                </h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-base text-gray-500">
                                        {file?.photo?.description ?? ""}
                                    </p>
                                </div>

                                <div className="mt-6 flex items-center">
                                    <CheckIcon
                                        className="h-5 w-5 flex-shrink-0 text-green-500"
                                        aria-hidden="true"
                                    />
                                    <div className="ml-2 text-sm text-gray-500">
                                        {file?.photo?.isLabelled ? (
                                            <Badge className="bg-green-500">
                                                Labelled
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-red-500">
                                                Not Labelled
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Product image */}
                        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                            <div className="h-96 overflow-hidden rounded-lg">
                                <img
                                    src={file?.photo?.image}
                                    alt={product.imageAlt}
                                    className="h-96 w-full object-cover "
                                />
                            </div>
                        </div>

                        {/* Product form */}
                        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                            <section aria-labelledby="options-heading">
                                <h2 id="options-heading" className="sr-only">
                                    Model Selection
                                </h2>

                                <form>
                                    <div className="sm:flex sm:justify-between">
                                        <RadioGroup
                                            value={selectedModel}
                                            onChange={setSelectedModel}
                                        >
                                            <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                                                Choose a model
                                            </RadioGroup.Label>
                                            <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                {choices.models.map(
                                                    (model: any) => (
                                                        <RadioGroup.Option
                                                            as="div"
                                                            key={model.name}
                                                            value={model}
                                                            className={({
                                                                active,
                                                            }) =>
                                                                classNames(
                                                                    active
                                                                        ? "ring-2 ring-indigo-500"
                                                                        : "",
                                                                    "relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                                                                )
                                                            }
                                                        >
                                                            {({
                                                                active,
                                                                checked,
                                                            }) => (
                                                                <>
                                                                    <RadioGroup.Label
                                                                        as="p"
                                                                        className="text-base font-medium text-gray-900"
                                                                    >
                                                                        {
                                                                            model.name
                                                                        }
                                                                    </RadioGroup.Label>
                                                                    <RadioGroup.Description
                                                                        as="p"
                                                                        className="mt-1 text-sm text-gray-500"
                                                                    >
                                                                        {
                                                                            model.description
                                                                        }
                                                                    </RadioGroup.Description>
                                                                    <div
                                                                        className={classNames(
                                                                            active
                                                                                ? "border"
                                                                                : "border-2",
                                                                            checked
                                                                                ? "border-indigo-500"
                                                                                : "border-transparent",
                                                                            "pointer-events-none absolute -inset-px rounded-lg"
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    )
                                                )}
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="mt-10">
                                        <button
                                            type="submit"
                                            onClick={handleLabel}
                                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                        >
                                            Label
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
                    {/* Details section */}

                    <section aria-labelledby="details-heading">
                        <div className="flex flex-col items-center text-center">
                            <h2
                                id="details-heading"
                                className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                            >
                              Your labelled images.
                            </h2>
                            <p className="mt-3 max-w-3xl text-lg text-gray-600">
                                Have a look at your labelled images.
                            </p>
                        </div>

                        <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
                            <div>
                            <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg h-80">
                                    {/* <img
                                        src={
                                            file?.labelled_image ??
                                            file?.photo?.image
                                        }
                                        alt="Drawstring top with elastic loop closure and textured interior padding."
                                        className="h-full w-full object-cover object-center"
                                    /> */}
                                    <div className="overflow-hidden  aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
                                        <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                                            <div>
                                                <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                                                    <div className="font-bold">
                                                       Segmented Image
                                                    </div>

                                                    <div className="opacity-60 text-sm ">
                                                      This is the segmented image based on your input image.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <img
                                            alt=""
                                            className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                                            src={
                                                file?.labelled_image ??
                                                file?.photo?.image
                                            }
                                        />
                                    </div>
                                </div>
                              
                            </div>
                            <div>
                                <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg h-80">
                                    {/* <img
                                        src={
                                            file?.labelled_image ??
                                            file?.photo?.image
                                        }
                                        alt="Drawstring top with elastic loop closure and textured interior padding."
                                        className="h-full w-full object-cover object-center"
                                    /> */}
                                    <div className="overflow-hidden  aspect-video bg-red-400 cursor-pointer rounded-xl relative group">
                                        <div className="rounded-xl z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                                            <div>
                                                <div className="transform-gpu  p-4 space-y-3 text-xl group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 pb-10 transform transition duration-300 ease-in-out">
                                                    <div className="font-bold">
                                                       Segmented Image
                                                    </div>

                                                    <div className="opacity-60 text-sm ">
                                                      This is the segmented image based on your input image.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <img
                                            alt=""
                                            className="object-cover w-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
                                            src={
                                                file?.labelled_image ??
                                                file?.photo?.image
                                            }
                                        />
                                    </div>
                                </div>
                             
                            </div>
                        </div>
                    </section>
                </div>

                <section aria-labelledby="notes-title">
                    <div className="bg-white shadow sm:overflow-hidden sm:rounded-lg">
                        <div className="divide-y divide-gray-200">
                            <div className="px-4 py-5 sm:px-6">
                                <h2
                                    id="notes-title"
                                    className="text-lg font-medium text-gray-900"
                                >
                                    Notes
                                </h2>
                            </div>
                            <div className="px-4 py-6 sm:px-6">
                                <ul role="list" className="space-y-8">
                                    {comments.map((comment: any) => (
                                        <li key={comment.id}>
                                            <div className="flex space-x-3">
                                                <div className="flex-shrink-0">
                                                    {/* <img
                                  className="h-10 w-10 rounded-full"
                                  src={`https://images.unsplash.com/photo-${comment.imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                                  alt=""
                                /> */}
                                                    <CircleUser className="h-5  w-5 rounded-full" />
                                                </div>
                                                <div>
                                                    <div className="text-sm">
                                                        <a
                                                            href="#"
                                                            className="font-medium text-gray-900"
                                                        >
                                                            {comment.name}
                                                        </a>
                                                    </div>
                                                    <div className="mt-1 text-sm text-gray-700">
                                                        <p>{comment.comment}</p>
                                                    </div>
                                                    <div className="mt-2 space-x-2 text-sm">
                                                        <span className="font-medium text-gray-500">
                                                            {formattedDate(
                                                                comment.created_at
                                                            )}
                                                        </span>{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-6 sm:px-6">
                            <div className="flex space-x-3">
                                <div className="flex-shrink-0">
                                    <CircleUser className="h-5 w-5 rounded-full" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <form
                                        onSubmit={(e) =>
                                            addComment(
                                                e,
                                                file.photo.id.toString(),
                                                newComment
                                            )
                                        }
                                    >
                                        <div>
                                            <label
                                                htmlFor="comment"
                                                className="sr-only"
                                            >
                                                Comment
                                            </label>
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                rows={3}
                                                // value={newComment}
                                                // onChange={(e) =>
                                                //     setNewComment(
                                                //         e.target.value
                                                //     )
                                                // }
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                placeholder="Add a note"
                                                defaultValue={""}
                                            />
                                        </div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <Button
                                                type="submit"
                                                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                            >
                                                Comment
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
