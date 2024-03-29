"use client"
import { useAppDispatch } from "@/store/store"
import { registerUser } from "@/reducers/functions"
import * as React from "react"
import { useForm } from "react-hook-form"
import Image from "next/image"
import Link from "next/link"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader } from "lucide-react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
type FormData = {
    username: string
    email: string
    password: string
    password2: string
}

const schema = yup
    .object({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup
            .string()
            .required()
            .notOneOf(
                ["password", "12345", "Password123", "Password"],
                'Password cannot contain the word "password"'
            )
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                "Password must be strong. It should contain at least one uppercase letter, one lowercase letter, one number, and one special character, and be between 8 and 20 characters long."
            ),
        password2: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required(),
    })
    .required()

export default function SignupForm() {
    const router = useRouter()
    const [loading, setLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    })

    const dispatch = useAppDispatch()
    const onSubmit = handleSubmit((data: FormData) => {
        try {
            setLoading(true)
            const { username, email, password, password2 } = data
            dispatch(
                registerUser(
                    username,
                    email,
                    password,
                    password2,
                    toast,
                    router
                )
            ) // dispatch register function
            setLoading(false)
        } catch (error: any) {
            toast.error(error)
        }
    })

    return (
        <>
            <div className="flex h-screen flex-1 bg-white">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <Image
                                width={48}
                                height={48}
                                className="h-10 w-auto rounded-full"
                                src="/findmyaccomlogo.png"
                                alt="Your Company"
                            />
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign up
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Already a member?{" "}
                                <Link
                                    href="/user/login"
                                    className="font-semibold text-sky-600 hover:text-indigo-500"
                                >
                                    Login here
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
                                            Username
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="username"
                                                type="text"
                                                {...register("username")}
                                                required
                                                className="block text-black w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-red-500">
                                        {errors.username?.message}
                                    </p>
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
                                                className="block text-black w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                        <p className="text-red-500">
                                            {errors.password?.message}
                                        </p>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Confirm Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="password2"
                                                type="password"
                                                {...register("password2")}
                                                autoComplete="current-password"
                                                required
                                                className="block w-full text-black bg-white px-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-red-500">
                                        {errors.password?.message}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
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
                                                className="font-semibold text-sky-600 hover:text-indigo-500"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>

                                    <div>
                                        <button
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
                                                "Sign up"
                                            )}
                                        </button>
                                        <small className="block text-center text-gray-500 mt-2">
                                            By signing up, you agree to our{" "}
                                            <Link
                                                className="underline"
                                                href="/legal/terms"
                                            >
                                                Terms of Service
                                            </Link>{" "}
                                            and{" "}
                                            <Link
                                                className="underline"
                                                href="/legal/privacy"
                                            >
                                                Privacy Policy
                                            </Link>
                                            .
                                        </small>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <Image
                        width={700}
                        height={700}
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1572798177370-303020c3e6e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
}