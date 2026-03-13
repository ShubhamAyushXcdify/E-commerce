"use client"

import { useState } from "react"

export default function AddProductPage() {

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = async (e: any) => {

    e.preventDefault()

    const newProduct = {
      title,
      price,
      description,
      image,
      category
    }

    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const data = await res.json()

    alert("Product Added Successfully")

    console.log(data)

  }

  return (

    <div style={{ padding: "30px" }}>

      <h1>Add Product</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>

        <input
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={input}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={input}
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={input}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textarea}
        />

        <button style={button}>
          Add Product
        </button>

      </form>

    </div>

  )
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
}

const textarea = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
}

const button = {
  padding: "10px 16px",
  background: "#2874f0",
  color: "#fff",
  border: "none",
  borderRadius: "5px"
}