import Link from "next/link"
import React from "react"

type Props = {}

export default function Navbar({}: Props) {
    return (
        <div>
            <div className="fixed top-4 inset-x-0 z-50">
                <div className="lg:max-w-xl mx-auto px-8">
                    <div className="w-full mx-auto">
                        <div className="relative flex flex-col w-full p-3 mx-auto bg-black/70 border border-white/10 shadow-thick backdrop-blur-xl backdrop-filter rounded-xl md:rounded-full md:items-center md:justify-between md:flex-row md:px-6">
                            <div className="flex flex-row items-center justify-between md:justify-start">
                                <a
                                    className="text-white hover:text-white/50 items-center font-bold gap-3 inline-flex text-lg"
                                    href="/"
                                    title="link to your page"
                                    aria-label="your label"
                                >
                                    <svg
                                        className="h-6"
                                        viewBox="0 0 92 93"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M33.263 19.8878C35.5755 32.2097 45.8661 46.1978 45.8661 46.1978C45.8661 46.1978 57.2841 30.6774 58.7685 17.9323C58.979 16.9071 59.09 15.841 59.09 14.7466C59.09 6.7196 53.1162 0.212402 45.7471 0.212402C38.378 0.212402 32.4042 6.7196 32.4042 14.7466C32.4042 16.5567 32.708 18.2895 33.263 19.8878ZM45.8507 46.2191C44.3889 45.1646 31.2923 35.8942 19.6762 33.7139C18.0776 33.1587 16.3446 32.8549 14.5342 32.8549C6.5072 32.8549 0 38.8287 0 46.1978C0 53.5668 6.5072 59.5407 14.5342 59.5407C15.6281 59.5407 16.6938 59.4297 17.7186 59.2194C29.2251 57.8799 42.9944 48.4428 45.5623 46.6209C43.7404 49.1889 34.3041 62.9571 32.964 74.4632C32.7535 75.4884 32.6425 76.5545 32.6425 77.6489C32.6425 85.6759 38.6163 92.1831 45.9854 92.1831C53.3545 92.1831 59.3283 85.6759 59.3283 77.6489C59.3283 75.8388 59.0245 74.106 58.4695 72.5077C56.3939 61.4479 47.8908 49.0459 46.1706 46.6212C48.7396 48.4438 62.508 57.88 74.0139 59.2194C75.0387 59.4297 76.1043 59.5407 77.1982 59.5407C85.2253 59.5407 91.7325 53.5668 91.7325 46.1978C91.7325 38.8287 85.2253 32.8549 77.1982 32.8549C75.3879 32.8549 73.6548 33.1587 72.0563 33.7139C60.4405 35.8942 47.3444 45.164 45.8819 46.219C45.8716 46.2049 45.8663 46.1978 45.8663 46.1978C45.8663 46.1978 45.8611 46.2049 45.8507 46.2191Z"
                                            fill="currentColor"
                                        ></path>
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M33.263 19.8878C35.5755 32.2097 45.8661 46.1978 45.8661 46.1978C45.8661 46.1978 57.2841 30.6774 58.7685 17.9323C58.979 16.9071 59.09 15.841 59.09 14.7466C59.09 6.7196 53.1162 0.212402 45.7471 0.212402C38.378 0.212402 32.4042 6.7196 32.4042 14.7466C32.4042 16.5567 32.708 18.2895 33.263 19.8878ZM45.8507 46.2191C44.3889 45.1646 31.2923 35.8942 19.6762 33.7139C18.0776 33.1587 16.3446 32.8549 14.5342 32.8549C6.5072 32.8549 0 38.8287 0 46.1978C0 53.5668 6.5072 59.5407 14.5342 59.5407C15.6281 59.5407 16.6938 59.4297 17.7186 59.2194C29.2251 57.8799 42.9944 48.4428 45.5623 46.6209C43.7404 49.1889 34.3041 62.9571 32.964 74.4632C32.7535 75.4884 32.6425 76.5545 32.6425 77.6489C32.6425 85.6759 38.6163 92.1831 45.9854 92.1831C53.3545 92.1831 59.3283 85.6759 59.3283 77.6489C59.3283 75.8388 59.0245 74.106 58.4695 72.5077C56.3939 61.4479 47.8908 49.0459 46.1706 46.6212C48.7396 48.4438 62.508 57.88 74.0139 59.2194C75.0387 59.4297 76.1043 59.5407 77.1982 59.5407C85.2253 59.5407 91.7325 53.5668 91.7325 46.1978C91.7325 38.8287 85.2253 32.8549 77.1982 32.8549C75.3879 32.8549 73.6548 33.1587 72.0563 33.7139C60.4405 35.8942 47.3444 45.164 45.8819 46.219C45.8716 46.2049 45.8663 46.1978 45.8663 46.1978C45.8663 46.1978 45.8611 46.2049 45.8507 46.2191Z"
                                            fill="currentColor"
                                            fillOpacity="0.2"
                                        ></path>
                                    </svg>

                                    <span>Open comp</span>
                                </a>
                                <button className="inline-flex items-center justify-center p-2 text-zinc-400 hover:text-blue-300 focus:outline-none focus:text-white md:hidden">
                                    <svg
                                        className="size-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className="inline-flex"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        ></path>
                                        <path
                                            className="hidden"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                            <nav className="flex-col flex-grow hidden py-12 md:py-0 md:flex md:items-end justify-center md:flex-row">
                                <ul className="space-y-2 list-none md:space-y-0 text-xs text-white md:ml-auto items-center md:inline-flex justify-center text-center md:text-left gap-3">
                                    <li>
                                        <Link
                                            href={"/user/login"}
                                            title="link to your page"
                                            aria-label="your label"
                                            className="py-1.5 px-4 border focus:ring-2 text-xs rounded-full border-transparent bg-white hover:bg-white/10 text-black duration-200 focus:ring-offset-2 focus:ring-white hover:text-white inline-flex items-center justify-center ring-1 ring-transparent lg:ml-auto"
                                        >
                                            Login
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
