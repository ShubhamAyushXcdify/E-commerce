"use client"

import { useEffect, useState } from "react"
import AddCart from "../cart/addCart"

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

  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")

  /* FETCH PRODUCTS */

  useEffect(() => {

    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))

  }, [])

  /* FILTER PRODUCTS */

  const filteredProducts = products.filter(product => {

    const text = search.toLowerCase().trim()

    const titleMatch =
      product.title.toLowerCase().includes(text)

    const categoryMatch =
      category === "all" || product.category === category

    return titleMatch && categoryMatch
  })

  /* SEARCH SUGGESTIONS */

  const suggestions = products
    .filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 5)


  return (

    <div style={containerStyle}>

      {/* SEARCH SECTION */}

      <div style={searchWrapper}>

        <input
          type="text"
          placeholder="Search products..."
          value={search}

          onChange={(e) => {

            const value = e.target.value
            setSearch(value)

            const text = value.toLowerCase()

            if (text.includes("men")) setCategory("men's clothing")
            else if (text.includes("women")) setCategory("women's clothing")
            else if (text.includes("jewel")) setCategory("jewelery")
            else if (text.includes("elect")) setCategory("electronics")
            else setCategory("all")

          }}

          style={searchInput}
        />

        {/* SEARCH SUGGESTIONS */}

        {search && suggestions.length > 0 && (

          <div style={suggestionBox}>

            {suggestions.map(p => (

              <div
                key={p.id}
                style={suggestionItem}

                onClick={() => setSearch(p.title)}
              >
                {p.title}
              </div>

            ))}

          </div>

        )}

      </div>


      {/* CATEGORY FILTER */}

      <div style={categoryWrapper}>

        <button onClick={() => setCategory("all")} style={tabStyle(category === "all")}>All</button>
        <button onClick={() => setCategory("men's clothing")} style={tabStyle(category === "men's clothing")}>Men</button>
        <button onClick={() => setCategory("women's clothing")} style={tabStyle(category === "women's clothing")}>Women</button>
        <button onClick={() => setCategory("jewelery")} style={tabStyle(category === "jewelery")}>Jewellery</button>
        <button onClick={() => setCategory("electronics")} style={tabStyle(category === "electronics")}>Electronics</button>

      </div>


      {/* PRODUCT GRID */}

      <div style={productGrid}>

        {filteredProducts.map(product => (

          <div key={product.id} style={productCard}>

            <img
              src={product.image}
              style={productImage}
            />

            <h3 style={productTitle}>
              {product.title.substring(0, 45)}...
            </h3>

            <p style={priceStyle}>
              ${product.price}
            </p>

            <p style={ratingStyle}>
              ⭐ {product.rating?.rate} | {product.rating?.count} reviews
            </p>

            {/* <button
              style={cartButton}
              onClick={() => alert("Cart feature coming soon")}
            >
              Add to Cart
            </button> */}
            <AddCart productId={product.id}></AddCart>

          </div>

        ))}

      </div>

    </div>
  )
}


/* ---------------- STYLES ---------------- */

const containerStyle = {
  background: "#f1f3f6",
  minHeight: "100vh",
  padding: "20px"
}

const searchWrapper = {
  position: "relative" as const,
  marginBottom: "25px"
}

const searchInput = {
  padding: "10px",
  width: "300px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px"
}

const suggestionBox = {
  background: "white",
  borderRadius: "6px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
  width: "300px",
  position: "absolute" as const,
  top: "45px",
  left: "0",
  zIndex: 10
}

const suggestionItem = {
  padding: "10px 12px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
  fontSize: "14px"
}

const categoryWrapper = {
  display: "flex",
  gap: "15px",
  marginBottom: "25px",
  flexWrap: "wrap" as const
}

function tabStyle(active: boolean) {

  return {
    padding: "8px 14px",
    border: "none",
    borderRadius: "20px",
    background: active ? "#2874f0" : "#fff",
    color: active ? "#fff" : "#333",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
  }

}

const productGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
  gap: "20px"
}

const productCard = {
  background: "#fff",
  padding: "16px",
  borderRadius: "8px",
  textAlign: "center" as const,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  transition: "all 0.25s ease",
  cursor: "pointer"
}

const productImage = {
  width: "100%",
  height: "160px",
  objectFit: "contain" as const,
  marginBottom: "12px"
}

const productTitle = {
  fontSize: "15px",
  fontWeight: "500",
  height: "42px",
  overflow: "hidden",
  color: "#212121"
}

const priceStyle = {
  fontWeight: "600",
  color: "#388e3c",
  fontSize: "16px"
}

const ratingStyle = {
  fontSize: "12px",
  color: "#555"
}

const cartButton = {
  marginTop: "12px",
  padding: "9px 16px",
  border: "none",
  background: "#2874f0",
  color: "#fff",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "500"
}