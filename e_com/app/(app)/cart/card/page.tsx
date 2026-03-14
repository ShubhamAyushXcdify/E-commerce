"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type CartProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
};

export default function CartPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<CartProduct | null>(null);
  const [loading, setLoading] = useState(true);

  const idParam = searchParams.get("id");

  useEffect(() => {
    if (!idParam) return;

    const fetchProduct = async () => {
      setLoading(true);

      try {
        const res = await fetch(`https://fakestoreapi.com/products/${idParam}`);
        const data = await res.json();

        setProduct({ ...data, quantity: 1 });
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [idParam]);

  if (loading) {
    return <p className="text-center mt-20 text-gray-600">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20 text-gray-600">Product not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10 px-4">

     
      <div className="mb-6 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium shadow">
        ✅ Product added to cart successfully
      </div>

      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row">

        
        <div className="md:w-5/12 bg-gray-50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">

          <div className="w-[400px] h-[300px] flex items-center justify-center">

            <img
              src={product.image}
              alt={product.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow"
            />

          </div>

        </div>

       
        <div className="md:w-7/12 p-6 flex flex-col justify-between">

          <div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>

            <p className="text-sm text-gray-500 mb-1">
              {product.category}
            </p>

            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-sm font-medium text-gray-700 mb-2">
              Quantity: {product.quantity}
            </p>

            <p className="text-gray-600 leading-relaxed mb-4">
              {product.description}
            </p>

          </div>

          <button
            onClick={() => router.push("/shop")}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-medium transition shadow-sm w-full sm:w-auto"
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>
  );
}