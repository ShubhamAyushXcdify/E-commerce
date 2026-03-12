"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity?: number;
};

const style = {
  display: "flex",
  border: "1px solid #ddd",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  transition: "transform 0.2s",
};

const ButtonStyle = {
  backgroundColor: "#ff0000",
  color: "#ffffff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};

export default function UserCartPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  // 🔹 Read userId from sessionStorage
  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (id) {
      setUserId(Number(id));
    }
  }, []);

  console.log("UserId:", userId);

  useEffect(() => {
    if (!userId) return; // wait until userId is loaded

    const fetchData = async () => {
      try {
        const cartRes = await fetch("https://fakestoreapi.com/carts");
        const carts = await cartRes.json();

        const userCart = carts.find((cart: any) => cart.userId === userId);

        if (!userCart) {
          setProducts([]);
          setLoading(false);
          return;
        }

        const productsRes = await fetch("https://fakestoreapi.com/products");
        const allProducts = await productsRes.json();

        const detailedProducts = userCart.products.map((item: any) => {
          const productDetail = allProducts.find(
            (p: any) => p.id === item.productId
          );

          return {
            ...productDetail,
            quantity: item.quantity,
          };
        });

        setProducts(detailedProducts);
      } catch (error) {
        console.error("Fetch error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (products.length === 0) return <p>No products found for user {userId}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User {userId} Cart</h2>

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {products.map((product) => (
          <div key={product.id} style={style}>
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: "70px",
                objectFit: "contain",
                background: "#f9f9f9",
                padding: "10px",
              }}
            />

            <div style={{ padding: "15px", flex: 1 }}>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
                {product.title}
              </h3>

              <p style={{ margin: "0 0 5px 0", color: "#555" }}>
                Category: {product.category}
              </p>

              <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
                ${product.price}
              </p>

              <p style={{ margin: "0 0 5px 0", color: "#777" }}>
                Quantity: {product.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <Link href="/shop">
          <button style={ButtonStyle}>Shop More</button>
        </Link>
      </div>
    </div>
  );
}