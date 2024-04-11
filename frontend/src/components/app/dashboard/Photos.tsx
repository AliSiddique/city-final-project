"use client"
import axios from "axios"
import React from "react"
import { Button } from "../../ui/button"

type Props = {
    files: any
}

export default function Photos({ files }: Props) {
    console.log(files)
    const [label, setLabel] = React.useState("")
    console.log("label " + label[0])
    const handleSubmit = async (e: any, image: string) => {
        e.preventDefault()
        console.log(image)
        const res = await axios.post("http://127.0.0.1:8000/api/label", {
            image: image,
        })
        const data = res.data
        console.log("data " + data.results)
        setLabel(data.results)
    }
    return (
        <div>
            {files.map((file: any) => (
                <li key={file.name} className="">
                    <div className="flex justify-center">
                        <img src={file.image} alt="" className="h-30 w-40 " />
                        {label && (
                            <img
                                src={label ?? ""}
                                alt=""
                                className="h-30 w-40"
                            />
                        )}
                    </div>
                    <div>
                        {/* <img
    src={file.image}
    alt=""
   className='h-30 w-40 '
    /> */}
                        <Button
                            onClick={(e) => handleSubmit(e, file.image)}
                            className="text-4xl m-20 bg-black text-white"
                        >
                            Label
                        </Button>
                        {/* 
    <button type="button" className="absolute inset-0 focus:outline-none">
    <span className="sr-only">View details for your image</span>
    </button> */}
                    </div>
                    {/* <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
    {file.name}
</p>
<p className="pointer-events-none block text-sm font-medium text-gray-500">{file.size}</p> */}
                </li>
            ))}
        </div>
    )
}
