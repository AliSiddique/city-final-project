"use client"
import { Provider } from "react-redux"
import React from "react"
import { configuredStore } from "@/store/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "sonner"

const queryClient = new QueryClient()
type Props = {
    children: React.ReactNode
}
const storeValue = configuredStore()

const RootRedux = ({ children }: Props) => (
    <QueryClientProvider client={queryClient}>
        <Provider store={storeValue}>
            <Toaster position="top-right" />
            {children}
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
)

export default RootRedux