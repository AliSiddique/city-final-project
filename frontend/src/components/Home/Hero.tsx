import Link from "next/link"
import React from "react"

type Props = {}

export default function Hero({}: Props) {
    return (
        <div>
            <section className="lg:p-8 overflow-hidden">
                <div className="mx-auto 2xl:max-w-7xl py-24 lg:px-16 md:px-12 px-8 xl:px-40 items-center lg:py-40 w-full bg-gradientdown rounded-[3rem] overflow-hidden relative">
                    <img
                        className="sr-only lg:not-sr-only lg:absolute -mt-16 -right-64"
                        src="/images/assets/cube.png"
                        alt=""
                    />
                    <div className="max-w-xl">
                        <div className="mb-8 flex">
                            <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white/10">
                                Welcome to Open comp
                            </span>
                        </div>
                        <div className="mt-6">
                            <h1 className="text-3xl tracking-tight mt-6 font-light lg:text-4xl text-white">
                                Open comp is the perfect tool
                                <span className="block text-zinc-400">
                                    {" "}
                                    for labelling images.
                                </span>
                            </h1>

                            <p className="text-white mt-6 text-balance">
                                Open comp is a tool that allows you to label
                                images with ease. You can upload images, label
                                them and download the labelled images. You can
                                also view the labelled images.
                            </p>
                            <div className="inline-flex flex-wrap items-center mt-8">
                                <Link
                                    href="/"
                                    title="link to your page"
                                    aria-label="your label"
                                    className="text-sm py-2 px-4 border focus:ring-2 rounded-full border-transparent bg-white hover:bg-white/10 text-black duration-200 focus:ring-offset-2 focus:ring-white hover:text-white inline-flex items-center justify-center ring-1 ring-transparent"
                                >
                                    Get started
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
