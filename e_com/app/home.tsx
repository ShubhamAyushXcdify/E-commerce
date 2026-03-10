"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const style2 ={
              flex: "0 0 500px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
              padding: "5px",
              width:"500px"
            }
const cardStyle ={
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f7f7f7",
                borderRadius: "10px",
                padding: "10px",
                
              }


export default function ProductCarousel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

const style1 ={
          display: "flex",
          gap: "20px",
          transform: `translateX(-${current * (250 + 20)}px)`,
          transition: "transform 0.5s ease",
        }


  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await res.json();

      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setProducts(shuffled);
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % (products.length - 2));
    }, 4000);

    return () => clearInterval(interval);
  }, [products]);

  if (products.length === 0) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div style={{ overflow: "hidden", width: "100%", maxWidth: "1500px", margin: "40px auto" }}>
        
      <div ref={containerRef} style={style1} >
        {products.map((product) => (
          <div key={product.id} style={style2}>
           <Link href={`/shop/${product.id}`} style={{textDecoration: "none", color: "inherit"}}> <div style={cardStyle} >
              <img src={product.image} alt={product.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
            </div>
            <h3 style={{ fontSize: "16px", marginTop: "10px", height: "48px", overflow: "hidden" }}>
              {product.title}
            </h3>
            <p style={{ color: "green", fontWeight: "bold" }}>${product.price}</p>
            </Link>
          </div> 
          
          
        ))}
      </div>
      
    </div>
  );
}