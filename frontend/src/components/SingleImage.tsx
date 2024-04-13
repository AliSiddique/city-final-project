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
const policies = [
    {
        name: "Free delivery all year long",
        description:
            "Name another place that offers year long free delivery? We’ll be waiting. Order now and you’ll get delivery absolutely free.",
        imageSrc:
            "https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg",
    },
    {
        name: "24/7 Customer Support",
        description:
            "Or so we want you to believe. In reality our chat widget is powered by a naive series of if/else statements that churn out canned responses. Guaranteed to irritate.",
        imageSrc:
            "https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg",
    },
    {
        name: "Fast Shopping Cart",
        description:
            "Look at the cart in that icon, there's never been a faster cart. What does this mean for the actual checkout experience? I don't know.",
        imageSrc:
            "https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg",
    },
    {
        name: "Gift Cards",
        description:
            "We sell these hoping that you will buy them for your friends and they will never actually use it. Free money for us, it's great.",
        imageSrc:
            "https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg",
    },
]

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
    name: string
    uploaded_at: string
    isLabelled: boolean
    tag: string
}

interface Props {
    token: string
    file: {
        photo: Photo
        labelled_image: string
        comments: Comment[]
    }
}

export default function SingleImage({ token, file }: Props) {
    const [comments, setComments] = useState<Comment[]>(file.comments ?? [])
    const [newComment, setNewComment] = useState<Comment | undefined>(undefined)
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
        const res = await axios.post(`${BASEURL}/api/label`, {
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
                                    {file.photo.name}
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
                                        {product.description}
                                    </p>
                                </div>

                                <div className="mt-6 flex items-center">
                                    <CheckIcon
                                        className="h-5 w-5 flex-shrink-0 text-green-500"
                                        aria-hidden="true"
                                    />
                                    <div className="ml-2 text-sm text-gray-500">
                                        {file.photo.isLabelled ? (
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
                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                                <img
                                    src={file.photo.image}
                                    alt={product.imageAlt}
                                    className="h-96 w-full object-contain object-center"
                                />
                            </div>
                        </div>

                        {/* Product form */}
                        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                            <section aria-labelledby="options-heading">
                                <h2 id="options-heading" className="sr-only">
                                    Product options
                                </h2>

                                <form>
                                    {/* <div className="sm:flex sm:justify-between">
                                        <RadioGroup
                                            value={selectedSize}
                                            onChange={setSelectedSize}
                                        >
                                            <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                                                Size
                                            </RadioGroup.Label>
                                            <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                {product.sizes.map((size) => (
                                                    <RadioGroup.Option
                                                        as="div"
                                                        key={size.name}
                                                        value={size}
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
                                                                    {size.name}
                                                                </RadioGroup.Label>
                                                                <RadioGroup.Description
                                                                    as="p"
                                                                    className="mt-1 text-sm text-gray-500"
                                                                >
                                                                    {
                                                                        size.description
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
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    </div> */}

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
                                The Fine Details
                            </h2>
                            <p className="mt-3 max-w-3xl text-lg text-gray-600">
                                Our patented padded snack sleeve construction
                                protects your favorite treats from getting
                                smooshed during all-day adventures, long shifts
                                at work, and tough travel schedules.
                            </p>
                        </div>

                        <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
                            <div>
                                <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg h-80">
                                    <img
                                        src={
                                            file.labelled_image ??
                                            file.photo.image
                                        }
                                        alt="Drawstring top with elastic loop closure and textured interior padding."
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <p className="mt-8 text-base text-gray-500">
                                    The 20L model has enough space for 370 candy
                                    bars, 6 cylinders of chips, 1,220 standard
                                    gumballs, or any combination of on-the-go
                                    treats that your heart desires. Yes, we did
                                    the math.
                                </p>
                                <div className="ml-auto flex items-center gap-2">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-7 gap-1"
                                            >
                                                <ListFilter className="h-3.5 w-3.5" />
                                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                    Filter
                                                </span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Filter by
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuCheckboxItem checked>
                                                Active
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem>
                                                Draft
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem>
                                                Archived
                                            </DropdownMenuCheckboxItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 gap-1"
                                    >
                                        <Link
                                            target="_blank"
                                            href={
                                                file.labelled_image ??
                                                file.photo.image
                                            }
                                        >
                                            <File className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Export
                                            </span>
                                        </Link>
                                    </Button>
                                    <Button size="sm" className="h-7 gap-1">
                                        <PlusCircle className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Add Product
                                        </span>
                                    </Button>
                                </div>
                            </div>
                            <div>
                                <div className="aspect-h-2 aspect-w-3 w-full overflow-hidden rounded-lg">
                                    <img
                                        src="https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-02.jpg"
                                        alt="Front zipper pouch with included key ring."
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <p className="mt-8 text-base text-gray-500">
                                    Up your snack organization game with
                                    multiple compartment options. The
                                    quick-access stash pouch is ready for even
                                    the most unexpected snack attacks and
                                    sharing needs.
                                </p>
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
                                                About
                                            </label>
                                            {/* <textarea
                                                id="comment"
                                                name="comment"
                                                rows={3}
                                                value={newComment}
                                                onChange={(e) =>
                                                    setNewComment(
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                                placeholder="Add a note"
                                                defaultValue={""}
                                            /> */}
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
