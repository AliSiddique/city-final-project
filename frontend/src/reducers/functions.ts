import axios, { AxiosError } from "axios"
import { TypedDispatch } from "@/store/store"
import { setToken, setUserInfo } from "./slices/authReducers"
import { UserType } from "./slices/authReducers"
import { BASEURL } from "@/API/APIRoute"
// Register a new user
export const registerUser =
    (
        username: string,
        email: string,
        password1: string,
        password2: string,
        toast: any,
        router: any
    ) =>
    async (dispatch: TypedDispatch) => {
        const toastId = toast.loading("Signing Up...")

        try {
            const url = `${BASEURL}/api/auth/register/`
            await axios.post(url, { username, email, password1, password2 })
            toast.success("Registered successfully", {
                id: toastId,
            })
            router.push("/user/login")
        } catch (error: any) {
            if (error.response.data.email)
                toast.error(error.response.data.email, {
                    id: toastId,
                })
            else if (error.response.data.username)
                toast.error(error.response.data.username, {
                    id: toastId,
                })
            else {
                toast.error("Something went wrong", {
                    id: toastId,
                })
            }
        }
    }

// Login a user
export const loginUser =
    (email: string, password: string, toast: any, router: any) =>
    async (dispatch: TypedDispatch) => {
        const toastId = toast.loading("Logging in...")

        try {
            const url = `${BASEURL}/api/auth/login/`
            const { data } = await axios.post(url, { email, password })

            dispatch(setToken(data.key))
            toast.success("Logged In successfully", {
                id: toastId,
            })
            router.push("/dashboard")
            // redirect ...
        } catch (error) {
            toast.error("Invalid Credentials", {
                id: toastId,
            })
        }
    }
// Fetch user information
export const fetchUserInfo = () => async (dispatch: TypedDispatch) => {
    try {
        // do a GET request
        const url = `${BASEURL}/api/auth/user/`
        const { data } = await axios.get(url)

        // set the user info in the store
        dispatch(setUserInfo(data))
    } catch (error) {
        console.error("Error occurred when fetching user information")
    }
}

export const logout = () => async (dispatch: TypedDispatch) => {
    try {
        dispatch(setToken(""))
        dispatch(setUserInfo({} as UserType))

        const url = `${BASEURL}/api/auth/logout/`
        await axios.post(url)
    } catch (error) {}
}
