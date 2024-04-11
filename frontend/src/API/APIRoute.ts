// apiRoutes.js
export let BASEURL: string = ""
if (process.env.NODE_ENV === "development") {
    BASEURL = "http://127.0.0.1:8000"
} else {
    BASEURL = "https://api.findmyaccom.com"
}
