import axios from "axios"
export const setAxiosAuthToken = (token: string | null) => {
    if (typeof token !== "undefined" && token) {
        // Apply for every request
        axios.defaults.headers.common["Authorization"] = "Token " + token
    } else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"]
    }
}