// "use client"
// import Link from "next/link"
// import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"
// import AddCart from "../../cart/addCart"

// interface Product {
//  id: number
//  title: string
//  price: number
//  description: string
//  category: string
//  image: string
//  rating: {
//  rate: number
//  count: number
//  }
// }

// export default function SingleProductPage() {

//  const params = useParams()
//  const id = params.id

//  const [product, setProduct] = useState<Product | null>(null)

// useEffect(() => {
//   fetch(`https://fakestoreapi.com/products/${id}`)
//     .then(res => res.json())
//     .then(data => setProduct(data))
// }, [id])
//  if (!product) {
//  return <h2 style={{ padding: "20px" }}>Loading product...</h2>
//  }
//  return (

//  <div style={{ padding: "30px" }}>

//  <div style={{
//  display: "flex",
//  gap: "40px",
//  background: "#fff",
//  padding: "20px",
//  borderRadius: "10px"
//  }}>

//  <img
//  src={product.image}
//  style={{ width: "300px", height: "300px", objectFit: "contain" }}
//  />

//  <div>

//  <h2>{product.title}</h2>

//  <p style={{ fontSize: "22px", color: "#388e3c" }}>
//  ${product.price}
//  </p>

//  <p>
//  ⭐ {product.rating.rate} ({product.rating.count} reviews)
//  </p>

//  <p style={{ marginTop: "20px" }}>
//  {product.description}
//  </p>
//  <AddCart productId={product.id}></AddCart>


//  </div>

//  </div>

//  </div>
//  )
// }


"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import AddCart from "../../cart/addCart"

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
  return <h2 className="p-5 text-lg">Loading product...</h2>
 }

 return (

 <div className="p-8">

 <div className="flex gap-10 bg-white p-5 rounded-lg shadow-sm">

 <img
  src={product.image}
  alt={product.title}
  className="w-[300px] h-[300px] object-contain"
 />

 <div className="flex flex-col gap-4">

 <h2 className="text-2xl font-semibold">
  {product.title}
 </h2>

 <p className="text-2xl text-green-600 font-semibold">
  ${product.price}
 </p>

 <p className="text-gray-700">
  ⭐ {product.rating.rate} ({product.rating.count} reviews)
 </p>

 <p className="mt-4 text-gray-600 leading-relaxed">
  {product.description}
 </p>

 <AddCart productId={product.id} />

 </div>

 </div>

 </div>
 )
}