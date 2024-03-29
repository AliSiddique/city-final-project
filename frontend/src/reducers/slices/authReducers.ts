import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { TypedDispatch } from "../../store/store"
import { RootState } from "../../store/store"
import { setAxiosAuthToken } from "../utils"
import { hasCookie, getCookie, setCookie, deleteCookie } from "cookies-next"
type ProfileType = {
    plan: string
}

// add user type
export type UserType = {
    pk: number
    username: string
    first_name: string
    last_name: string
    email: string
    profile: ProfileType
}
// loading token from localStorage
let initToken = null
if (hasCookie("token")) {
    initToken = getCookie("token")
    setAxiosAuthToken(initToken as string)
}

const initialState = {
    token: initToken as string | null, // add token variable
    verifyEmailStatus: "unknown", // new variable in the store
    loggedIn: false as boolean | null,
    user: {
        pk: 0,
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        profile: {
            plan: "unknown",
        },
    } as UserType,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setVerifyEmailStatus(state, action: PayloadAction<string>) {
            state.verifyEmailStatus = action.payload
        },
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload
            setAxiosAuthToken(state.token)
            if (state.token) {
                setCookie("token", state.token)
                state.loggedIn = true
            } else {
                deleteCookie("token")
                state.loggedIn = false
            }
        },
        setUserInfo(state, action: PayloadAction<UserType>) {
            state.user = action.payload
        },
    },
})

export default authSlice.reducer
export const {
    setToken,
    setVerifyEmailStatus, // export new function
    setUserInfo, // export new function
} = authSlice.actions

export const getUserInfo = (state: RootState) => state.auth.user
export const getVerifyEmailStatus = (state: RootState) =>
    state.auth.verifyEmailStatus
export const getToken = (state: RootState) => state.auth.token
export const getLoggedIn = (state: RootState) => state.auth.loggedIn