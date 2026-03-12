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
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row">

        {/* Product Image */}
        <div className="md:w-5/12 bg-gray-50 p-4 md:p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
          <div className="product-image-wrapper">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-7/12 p-4 md:p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>

            <p className="text-sm text-gray-500 mb-1">{product.category}</p>

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

          <div>
            <button
              onClick={() => router.push("/shop")}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-xl font-medium transition-colors shadow-sm w-full sm:w-auto"
            >
              Continue Shopping
            </button>
          </div>
        </div>

      </div>

      <style jsx>{`
        .product-image-wrapper {
          width: 400px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 0.5rem;
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}