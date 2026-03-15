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
    return <h2 className="p-6">Loading product...</h2>
  }

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <div className="flex gap-10 bg-white p-6 rounded shadow">

        <img
          src={product.image}
          alt={product.title}
          className="w-80 h-80 object-contain"
        />

        <div>

          <h2 className="text-2xl font-semibold">
            {product.title}
          </h2>

          <p className="text-green-600 text-xl mt-2">
            ${product.price}
          </p>

          <p className="text-gray-600 mt-2">
            ⭐ {product.rating.rate} ({product.rating.count} reviews)
          </p>

          <p className="mt-4 text-gray-700">
            {product.description}
          </p>

          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-5">
            Add to Cart
          </button>

        </div>

      </div>

    </div>

  )
}