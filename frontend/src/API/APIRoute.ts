// Set the base URL for the API
export let BASEURL: string = ""
if (process.env.NODE_ENV === "development") {
    BASEURL = "http://127.0.0.1:8000"
} else {
    BASEURL = "https://city-final-project.onrender.com"
}


