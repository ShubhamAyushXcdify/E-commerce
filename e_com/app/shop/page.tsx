"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating?: {
    rate: number
    count: number
  }
}

export default function ShopPage() {

  const router = useRouter()

  const [products,setProducts] = useState<Product[]>([])
  const [search,setSearch] = useState("")
  const [category,setCategory] = useState("all")

  const [selectedIndex,setSelectedIndex] = useState(-1)
  const [showSuggestions,setShowSuggestions] = useState(false)

  useEffect(()=>{
    fetch("https://fakestoreapi.com/products")
      .then(res=>res.json())
      .then(data=>setProducts(data))
  },[])

  /* FILTER PRODUCTS */

  const filteredProducts = products.filter(product=>{

    const text = search.toLowerCase().trim()

    const titleMatch =
      product.title.toLowerCase().includes(text)

    const categoryMatch =
      category === "all" || product.category === category

    return titleMatch && categoryMatch

  })

  /* TYPEAHEAD */

  const suggestions = products
    .filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0,6)

  return (

    <div className="bg-gray-100 min-h-screen p-6">

      {/* SEARCH + ADD PRODUCT ROW */}

      <div className="flex items-center justify-between mb-6">

        {/* SEARCH */}

        <div className="relative w-96">

          <input
            type="text"
            placeholder="Search products..."
            value={search}

            onChange={(e)=>{

              const value = e.target.value
              setSearch(value)
              setShowSuggestions(true)
              setSelectedIndex(-1)

              const text = value.toLowerCase()

              if(text.includes("men")) setCategory("men's clothing")
              else if(text.includes("women")) setCategory("women's clothing")
              else if(text.includes("jewel")) setCategory("jewelery")
              else if(text.includes("elect")) setCategory("electronics")
              else setCategory("all")

            }}

            onKeyDown={(e)=>{

              if(e.key === "ArrowDown"){
                setSelectedIndex(prev =>
                  prev < suggestions.length -1 ? prev +1 : prev
                )
              }

              if(e.key === "ArrowUp"){
                setSelectedIndex(prev =>
                  prev > 0 ? prev -1 : prev
                )
              }

              if(e.key === "Enter" && selectedIndex >=0){
                router.push(`/shop/${suggestions[selectedIndex].id}`)
              }

            }}

            className="border px-3 py-2 rounded w-full"
          />

          {/* SUGGESTIONS */}

          {showSuggestions && search && suggestions.length >0 && (

            <div className="absolute bg-white shadow-lg rounded w-full mt-1 z-10 max-h-72 overflow-y-auto">

              {suggestions.map((p,index)=>(

                <div
                  key={p.id}

                  onClick={()=>{
                    setSearch(p.title)
                    setShowSuggestions(false)
                  }}

                  className={`flex items-center gap-3 px-3 py-2 cursor-pointer text-sm
                  ${index===selectedIndex ? "bg-gray-200" : "hover:bg-gray-100"}`}
                >

                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-8 h-8 object-contain"
                  />

                  {p.title}

                </div>

              ))}

            </div>

          )}

        </div>


        {/* ADD PRODUCT */}

        <Link href="/shop/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Product
          </button>
        </Link>

      </div>


      {/* CATEGORY FILTER */}

      <div className="flex gap-3 mb-6 flex-wrap">

        <button
          onClick={()=>setCategory("all")}
          className={`px-4 py-1 rounded-full ${
            category==="all"
              ? "bg-blue-600 text-white"
              : "bg-white shadow"
          }`}
        >
          All
        </button>

        <button
          onClick={()=>setCategory("men's clothing")}
          className="bg-white px-4 py-1 rounded-full shadow"
        >
          Men
        </button>

        <button
          onClick={()=>setCategory("women's clothing")}
          className="bg-white px-4 py-1 rounded-full shadow"
        >
          Women
        </button>

        <button
          onClick={()=>setCategory("jewelery")}
          className="bg-white px-4 py-1 rounded-full shadow"
        >
          Jewellery
        </button>

        <button
          onClick={()=>setCategory("electronics")}
          className="bg-white px-4 py-1 rounded-full shadow"
        >
          Electronics
        </button>

      </div>


      {/* PRODUCT GRID */}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

        {filteredProducts.map(product=>(
          <div key={product.id} className="bg-white p-4 rounded shadow text-center">

            <Link href={`/shop/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="h-40 object-contain mx-auto"
              />
            </Link>

            <Link href={`/shop/${product.id}`}>
              <h3 className="text-sm mt-2">
                {product.title.substring(0,45)}...
              </h3>
            </Link>

            <p className="text-green-600 font-semibold mt-2">
              ${product.price}
            </p>

            <p className="text-xs text-gray-500">
              ⭐ {product.rating?.rate} | {product.rating?.count} reviews
            </p>

            <button className="bg-blue-600 text-white px-3 py-1 rounded mt-2">
              Add to Cart
            </button>

          </div>
        ))}

      </div>

    </div>

  )
}