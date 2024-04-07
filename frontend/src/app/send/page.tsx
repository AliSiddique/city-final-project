"use client"
import axios from 'axios'
import React from 'react'

type Props = {}

export default function page({}: Props) {
    const handleClicked = async () => {
        const res = await axios.post('http://127.0.0.1:8000/api/upload-image', {
            image: 'https://city-uni-final-project.s3.amazonaws.com/images/6f1cefb5899bae4a8baef28364be7e6b.jpg'

        })
        const data = res.data
        console.log(data)
    }
  return (
    <div>
        <button onClick={handleClicked}>Click me</button>
    </div>
  )
}