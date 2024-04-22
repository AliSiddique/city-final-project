"use client" // Error components must be Client Components

import { useEffect } from "react"

import Image from "next/image"
import Link from "next/link"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    return (
        <div className="h-screen">
            <main className="relative isolate h-screen">
                <Image
                    width={3050}
                    height={2000}
                    src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
                />
                <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
                    <p className="text-base font-semibold leading-8 text-white">
                        404
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                        Error occured
                    </h1>
                    <p className="mt-4 text-base text-white/70 sm:mt-6">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex justify-center">
                        <Link
                            href="/"
                            className="text-sm font-semibold leading-7 text-white"
                        >
                            <span aria-hidden="true">&larr;</span> Back to home
                        </Link>
                        <button
                            onClick={
                                // Attempt to recover by trying to re-render the segment
                                () => reset()
                            }
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}