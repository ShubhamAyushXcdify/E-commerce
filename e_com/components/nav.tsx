import Link from "next/link"
import { FiShoppingCart } from "react-icons/fi";


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
      <h2 style={{ margin: 0 }}>ShopNow</h2>

      <ul style={link}>
        <li><Link style={linkStyle} href={"/"}>HOME</Link></li>
        <li><Link style={linkStyle}  href={"/shop"}>SHOP</Link></li>
        <li><Link style={linkStyle}  href={"/cart"}> <FiShoppingCart size={22} color="white"/></Link></li>
      </ul>
    </nav>

  </div>
  )}