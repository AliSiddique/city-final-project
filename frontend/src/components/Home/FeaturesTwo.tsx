import Link from "next/link";
import React from "react"

type Props = {}
const sections = [
    {
        title: "Image Export and Sharing",
        description:
            "Effortlessly export and share labeled images with team members or stakeholders. Enable seamless collaboration and decision-making by providing easy access to visual data.",
        imageSrc: "/images/assets/square.svg",
        imageAlt: "Image Export and Sharing Icon",
    },
    {
        title: "Interactive Annotations",
        description:
            "Enrich your labeled images with interactive annotations. Enhance understanding and communication by adding context directly onto images, facilitating clearer insights and discussions.",
        imageSrc: "/images/assets/circuitry.svg",
        imageAlt: "Interactive Annotations Icon",
    },
];

export default function FeaturesTwo({}: Props) {
    return (
        <div>
            <section className="lg:p-8">
                <div className="px-8 py-12 mx-auto md:px-12 lg:px-16 xl:px-36 2xl:max-w-7xl">
                    <div className="lg:text-center max-w-2xl lg:mx-auto">
                        <span className="text-blue-400">
                            {" "}
                            Features
                        </span>
                        <h2 className="text-3xl tracking-tight mt-6 font-light lg:text-4xl text-white">
                            Add comments{" "}
                            <span className="block text-zinc-400">
                                to your images.
                            </span>
                        </h2>
                        <p className="mt-5 text-white max-w-md mx-auto">
                            Open comp provides a range of features to help you
                            label and manage your visual data effectively.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 list-none mt-12 lg:gap-3 lg:grid-cols-2">
                        {sections.map((section) => (
                            <div className="mt-12 h-full lg:mt-0 bg-gradientdown ring-1 ring-white/10 rounded-4xl p-8 lg:p-20">
                                <h2 className="text-xl py-3 mt-6 tracking-tight font-medium text-white">
                                    {section.title}
                                </h2>
                                <p className="mt-4 text-sm text-zinc-400 text-pretty">
                                    {section.description}
                                </p>

                                <div className="mt-12">
                                    <img
                                        src={section.imageSrc}
                                        alt={section.imageAlt}
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="mt-12 h-full lg:mt-0 bg-gradientup ring-1 text-center ring-white/10 rounded-4xl p-8 lg:p-20 lg:col-span-full">
                            <h2 className="text-3xl mt-6 tracking-tight font-light lg:text-4xl text-white">
                                Export your data
                            </h2>
                            <p className="mt-4 text-sm text-zinc-300 max-w-xl mx-auto">
                              Export all your data.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
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
