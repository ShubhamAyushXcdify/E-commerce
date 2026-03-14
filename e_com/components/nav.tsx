"use client";

import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-800 text-white">

      <h2 className="text-xl font-semibold m-0">
        <Link href="/" className="text-white no-underline">
          ShopNow
        </Link>
      </h2>

      <ul className="flex gap-5 list-none m-0 p-0 items-center">

        <li>
          <Link href="/" className="text-white hover:text-gray-300">
            HOME
          </Link>
        </li>

        <li>
          <Link href="/shop" className="text-white hover:text-gray-300">
            SHOP
          </Link>
        </li>

        <li>
          <Link href="/cart" className="text-white hover:text-gray-300">
            <FiShoppingCart size={22} />
          </Link>
        </li>

        <li>
          <Link href="/users" className="text-white hover:text-gray-300">
            <FaCircleUser size={22} />
          </Link>
        </li>

      </ul>

    </nav>
  );
}