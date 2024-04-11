import Features from "@/components/Features"
import FeaturesTwo from "@/components/FeaturesTwo"
import Hero from "@/components/Hero"
import Navbar from "@/components/Layout/Navbar"
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
