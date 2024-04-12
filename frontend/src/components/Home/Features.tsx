import React from "react"

type Props = {}
const listOne = [
    {
        title: "Upload Images",
        description:
            "Easily upload images to your platform, enabling seamless access to visual data for analysis and organization.",
    },
    {
        title: "Label Images",
        description:
            "Effortlessly label uploaded images to categorize them based on content, facilitating efficient organization and retrieval.",
    },
    {
        title: "View Labeled Photos",
        description:
            "Instantly access and browse through labeled photos to gain insights and make informed decisions based on visual data.",
    },
    {
        title: "Access Logs and Analytics",
        description:
            "Track user activity, analyze trends, and gain valuable insights into platform usage through comprehensive logging and analytics features.",
    },
];

const listTwo = [
    {
        title: "Enhance Image Recognition",
        description:
            "Leverage advanced image recognition technology to improve the accuracy and efficiency of labeling processes.",
    },
    {
        title: "Streamline Labeling Workflow",
        description:
            "Implement intuitive interfaces and automation to streamline the image labeling process, saving time and effort for users.",
    },
    {
        title: "Visualize Data Insights",
        description:
            "Utilize powerful visualization tools to present data insights derived from image analysis and user activity logs.",
    },
    {
        title: "Ensure Data Security",
        description:
            "Implement robust security measures to safeguard uploaded images, user data, and analytics information from unauthorized access or breaches.",
    },
];

const listThree = [
    {
        title: "Facilitate Collaboration",
        description:
            "Encourage collaboration among users by providing features for sharing labeled images, insights, and analysis within teams or communities.",
    },
    {
        title: "Customize User Experience",
        description:
            "Offer customizable options to tailor the user interface and features according to individual preferences and business requirements.",
    },
    {
        title: "Scale Infrastructure",
        description:
            "Build a scalable infrastructure capable of handling large volumes of image data and user interactions while maintaining optimal performance.",
    },
    {
        title: "Ensure Regulatory Compliance",
        description:
            "Adhere to relevant data protection regulations and standards to ensure compliance and build trust among users regarding data privacy and security.",
    },
];


export default function Features({}: Props) {
    return (
        <section className="lg:p-8">
            <div className="mx-auto 2xl:max-w-7xl py-12 lg:px-16 md:px-12 px-8 xl:px-36 items-center w-full">
                <div>
                    <span className="text-blue-400"> Open comp's features</span>
                    <h2 className="text-3xl tracking-tight mt-6 font-light lg:text-4xl text-white">
                        Label your businesses data{" "}
                        <span className="md:block text-zinc-400">
                            with ease.
                        </span>
                    </h2>
                    <p className="mt-4 text-base text-white max-w-md">
                        Open comp provides a range of features to help you label and manage your visual data effectively. 
                    </p>
                </div>
                <div className="flex flex-col w-full">
                    <div
                        className="flex flex-col w-full"
                        aria-labelledby="carousel-label"
                        role="region"
                    >
                        <h2 className="sr-only" id="carousel-label">
                            Carousel
                        </h2>
                        <span className="sr-only" id="carousel-content-label">
                            Carousel
                        </span>
                        <div className="grid grid-cols-1 lg:grid-cols-4 pb-6 border-b border-white/10">
                         
                        </div>
                        <ul
                            className="flex gap-3 overflow-x-scroll pb-24 pt-12 scrollbar-hide snap-mandatory snap-x w-full"
                            role="listbox"
                            aria-labelledby="carousel-content-label"
                        >
                            <li
                                className="items-center justify-center w-full flex flex-col shrink-0 snap-start"
                                role="option"
                                x-bind="disableNextAndPreviousButtons"
                            >
                                <ul className="grid grid-cols-1 lg:grid-cols-4 gap-3 group h-full">
                                    {listOne.map((item) => (
                                        <li className="bg-ebony shadow-inset rounded-3xl p-4">
                                            <figure>
                                                <div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="icon icon-tabler icon-tabler-circle-check text-white"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        stroke-width="2"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    >
                                                        <path
                                                            stroke="none"
                                                            d="M0 0h24v24H0z"
                                                            fill="none"
                                                        />
                                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                                        <path d="M9 12l2 2l4 -4" />
                                                    </svg>
                                                    <p className="font-medium leading-6 text-white mt-24">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-xs mt-2 text-zinc-300">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </figure>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                
                       
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
