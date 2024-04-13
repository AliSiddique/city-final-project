import SignupForm from "@/components/forms/SignupForm"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from "react"

type Props = {}

export default function page({}: Props) {
    const token = cookies().get("token")
    if (token) {
        redirect("/dashboard")
    }
    return (
        <div>
            <SignupForm />
        </div>
    )
}
