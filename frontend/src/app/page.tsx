import Features from "@/components/Home/Features"
import FeaturesTwo from "@/components/Home/FeaturesTwo"
import Hero from "@/components/Home/Hero"
import Navbar from "@/components/Home/Navbar"
import React from "react"

type Props = {}

export default function page({}: Props) {
    return (
        <div className="bg-black flex flex-col min-h-svh">
            <Navbar />
            <Hero />
            <Features />
            <FeaturesTwo />
        </div>
    )
}
