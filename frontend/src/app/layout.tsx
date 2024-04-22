import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import RootRedux from "@/reducers/ReduxProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Open comp",
    description: "Open comp is an AI labelling tool.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <RootRedux>{children}</RootRedux>
            </body>
        </html>
    )
}
