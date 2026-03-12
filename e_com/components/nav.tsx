"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";


const linkStyle = { color: "white", textDecoration: "none" };
const link = {
          display: "flex",
          listStyle: "none",
          gap: "20px",
          margin: 0,
          padding: 0,
        }
const navStyle ={
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#333",
        color: "white",
      }
      
export default function Navbar(){
    return(<div>
    <nav
      style={navStyle}
    >
      <h2 style={{ margin: 0 }}><Link href={"/"} style={linkStyle}  >ShopNow</Link></h2>

      <ul style={link}>
        <li><Link style={linkStyle} href={"/"}>HOME</Link></li>
        <li><Link style={linkStyle}  href={"/shop"}>SHOP</Link></li>
        <li><Link style={linkStyle}  href={"/cart"}> <FiShoppingCart size={22} color="white"/></Link></li>
        <li><Link style={linkStyle}  href={"/cart"}><FaCircleUser size={22} color="white"/></Link></li>
      </ul>
    </nav>

  </div>
  )}

