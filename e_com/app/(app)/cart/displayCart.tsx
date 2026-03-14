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

export default function UserCartPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (id) {
      setUserId(Number(id));
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (products.length === 0)
    return <p className="text-center mt-10">No products found for user {userId}</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-6">Cart</h2>

      <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-[70px] object-contain bg-gray-100 p-2"
            />

            <div className="p-4 flex-1">
              <h3 className="text-sm font-medium mb-2">{product.title}</h3>

              <p className="text-gray-600 text-sm mb-1">
                Category: {product.category}
              </p>

              <p className="font-bold mb-1">${product.price}</p>

              <p className="text-gray-500 text-sm">
                Quantity: {product.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/shop">
          <button className="bg-red-500 text-white px-5 py-2 rounded-md text-base hover:bg-red-600 transition">
            Shop More
          </button>
        </Link>
      </div>
    </div>
  );
}