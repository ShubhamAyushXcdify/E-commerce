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
        style={{
          padding: "10px 20px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Loading..." : "Add to Cart"}
      </button>
    </div>
  );
}