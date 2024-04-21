"use client"
import { useAppDispatch } from "@/store/store"
import { loginUser } from "@/reducers/functions"
import * as React from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from "sonner"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"

type FormData = {
    email: string
    password: string
}

const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(20).required(),
    })
    .required()

export default function LoginForm() {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    })

    const dispatch = useAppDispatch()
    const onSubmit = handleSubmit((data: FormData) => {
        setLoading(true)
        try {
            const { email, password } = data
            dispatch(loginUser(email, password, toast, router)) // dispatch register function
            setLoading(false)
        } catch (error: any) {
            toast.error("Login failed")
            setLoading(false)
        }
    })

    return (
        <>
            <div className="flex h-screen flex-1 bg-white">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                                width={48}
                                height={48}
                                className="h-10 w-auto rounded-full"
                                src="/opencomp-logo.png"
                                alt="Your Company"
                            />
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Not a member?{" "}
                                <Link
                                    href="/user/signup"
                                    className="font-semibold text-sky-600 hover:text-sky-500"
                                >
                                    Signup here
                                </Link>
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                type="email"
                                                autoComplete="email"
                                                {...register("email")}
                                                required
                                                className="block w-full text-black rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-red-500">
                                        {errors.email?.message}
                                    </p>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Password
                                        </label>
                                        <div className="mt-2 relative">
                                            <input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                autoComplete="current-password"
                                                {...register("password")}
                                                required
                                                className="block w-full text-black rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 px-2 text-gray-600 focus:outline-none"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeSlashIcon className="h-6 w-6 text-black" />
                                                ) : (
                                                    <EyeIcon className="h-6 w-6 text-black" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-red-500">
                                        {errors.password?.message}
                                    </p>
                                    {/* <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label
                                                htmlFor="remember-me"
                                                className="ml-3 block text-sm leading-6 text-gray-700"
                                            >
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm leading-6">
                                            <Link
                                                href="#"
                                                className="font-semibold text-sky-600 hover:text-sky-500"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div> */}

                                    <div>
                                        <Button
                                            disabled={loading}
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            {loading ? (
                                                <Loader
                                                    color="white"
                                                    size={20}
                                                />
                                            ) : (
                                                "Sign in"
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        width={700}
                        height={700}
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}
