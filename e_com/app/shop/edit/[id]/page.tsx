"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function EditProductPage() {

  const params = useParams()
  const id = params.id

  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")

  /* FETCH PRODUCT */

  useEffect(() => {

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {

        setTitle(data.title)
        setPrice(data.price)
        setDescription(data.description)
        setCategory(data.category)
        setImage(data.image)

      })

  }, [id])

  /* UPDATE PRODUCT */

  const handleUpdate = async (e:any) => {

    e.preventDefault()

    const updatedProduct = {
      title,
      price,
      description,
      category,
      image
    }

    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json"
      }
    })

    alert("Product Updated Successfully")

  }

  return (

    <div style={{ padding: "30px" }}>

      <h1>Edit Product</h1>

      <form onSubmit={handleUpdate} style={{ maxWidth: "400px" }}>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={input}
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={input}
        />

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={input}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={textarea}
        />

        <button style={button}>
          Update Product
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