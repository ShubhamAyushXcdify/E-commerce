"use client"

import { useEffect, useState } from "react"

export default function Product() {

  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div style={{ padding: "40px", background: "#f5f5f5", minHeight: "100vh" }}>

      <h1 style={{ marginBottom: "30px" }}>Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
          gap: "25px"
        }}
      >

        {products.map(product => (

          <div
            key={product.id}

            style={{
              border: "1px solid #eee",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              background: "white",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease"
            }}

            onMouseEnter={(e:any)=>{
              e.currentTarget.style.transform="translateY(-8px)"
              e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,0.15)"
            }}

            onMouseLeave={(e:any)=>{
              e.currentTarget.style.transform="translateY(0)"
              e.currentTarget.style.boxShadow="0 4px 10px rgba(0,0,0,0.05)"
            }}

          >

            <img
              src={product.image}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
                marginBottom: "10px"
              }}
            />

            <h3 style={{ fontSize: "16px", minHeight: "45px" }}>
              {product.title.substring(0,40)}...
            </h3>

            <p style={{ color: "green", fontWeight: "bold" }}>
              ${product.price}
            </p>

            <button
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                border: "none",
                background: "#333",
                color: "white",
                borderRadius: "6px",
                cursor: "pointer",
                transition:"0.2s"
              }}

              onMouseEnter={(e:any)=>{
                e.currentTarget.style.background="#555"
              }}

              onMouseLeave={(e:any)=>{
                e.currentTarget.style.background="#333"
              }}

            >
              Add to Cart
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}