"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductSlideshow() {
  const [products, setProducts] = useState<Product[]>([]);
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const sliderStyle = {
    transform: `translateX(-${current * (250 + 20)}px)`
  };

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

  if (products.length === 0)
    return <p className="text-center">Loading...</p>;

  return (
    <div className="overflow-hidden w-full max-w-[1500px] mx-auto my-10">

      <div
        ref={containerRef}
        style={sliderStyle}
        className="flex gap-5 transition-transform duration-500 ease-in-out"
      >

        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none w-[500px] bg-white rounded-xl shadow-md text-center p-2"
          >

            <Link
              href={`/shop/${product.id}`}
              className="no-underline text-inherit"
            >

              <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-lg p-2">

                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                />

              </div>

              <h3 className="text-base mt-2 h-[48px] overflow-hidden">
                {product.title}
              </h3>

              <p className="text-green-600 font-bold">
                ${product.price}
              </p>

            </Link>

          </div>
        ))}

      </div>

    </div>
  );
}