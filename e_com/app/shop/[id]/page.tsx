"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export default function SingleProductPage() {

  const params = useParams()
  const id = params.id

  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [id])

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Loading product...</h2>
  }

  return (

    <div style={{ padding: "30px" }}>

      <div style={{
        display: "flex",
        gap: "40px",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px"
      }}>

        <img
          src={product.image}
          style={{ width: "300px", height: "300px", objectFit: "contain" }}
        />

        <div>

          <h2>{product.title}</h2>

          <p style={{ fontSize: "22px", color: "#388e3c" }}>
            ${product.price}
          </p>

          <p>
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </p>

          <p style={{ marginTop: "20px" }}>
            {product.description}
          </p>

          <button style={{
            marginTop: "20px",
            padding: "10px 18px",
            border: "none",
            background: "#2874f0",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  )
}