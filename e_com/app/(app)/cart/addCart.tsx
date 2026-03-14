"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddCart({ productId }: { productId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAdd = () => {
    setLoading(true);
    try {
      router.push(`/cart/card?id=${productId}`);
    } catch (error) {
      console.error("Error navigating to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleAdd}
        className="px-5 py-2 rounded-md border-none cursor-pointer bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Loading..." : "Add to Cart"}
      </button>
    </div>
  );
}