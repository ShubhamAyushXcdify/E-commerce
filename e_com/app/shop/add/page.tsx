"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddProductPage() {

  const router = useRouter()

  const [title,setTitle] = useState("")
  const [price,setPrice] = useState("")
  const [description,setDescription] = useState("")
  const [category,setCategory] = useState("")
  const [image,setImage] = useState("")
  const [message,setMessage] = useState("")

  const handleSubmit = async (e:any) => {

    e.preventDefault()

    const newProduct = {
      title,
      price,
      description,
      image,
      category
    }

    await fetch("https://fakestoreapi.com/products",{
      method:"POST",
      body:JSON.stringify(newProduct),
      headers:{
        "Content-Type":"application/json"
      }
    })

    setMessage("Product added successfully")

    setTimeout(()=>{
      router.push("/shop")
    },1000)

  }

  return (

    <div className="p-10 flex justify-center">

      <div className="bg-white p-6 rounded shadow w-96">

        <h1 className="text-xl font-semibold mb-4">
          Add Product
        </h1>

        {message && <p className="text-green-600 mb-3">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="border p-2 rounded"/>

          <input placeholder="Price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            className="border p-2 rounded"/>

          <input placeholder="Category"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="border p-2 rounded"/>

          <input placeholder="Image URL"
            value={image}
            onChange={(e)=>setImage(e.target.value)}
            className="border p-2 rounded"/>

          <textarea placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="border p-2 rounded"/>

          <button className="bg-blue-600 text-white py-2 rounded">
            Add Product
          </button>

        </form>

      </div>

    </div>

  )
}