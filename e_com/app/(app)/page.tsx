// // username: mor_2314
// // password: 83r5^_

import Login from "../(auth)/login/page"
import Navbar from "@/components/nav";
import ProductSlideshow from "../home";
const style = {
  
    fontFamily: "'Arial', sans-serif",
    fontSize: "2.8rem",       
    fontWeight: "700",       
    textAlign: "center",      
    lineHeight: "1.3",        
    color: "#111",            
    marginTop: "60px",
    marginBottom: "40px",
  }

export default function Home() {
  return (<main>
    <h1 style={style}>
  Welcome to <i style={{color:"#0011ff"}}>ShopNow</i>
  <br />
  <span style={{ fontWeight: "400", fontSize: "1.5rem", color: "#555" }}>
    Discover Your Next Favorite Thing
  </span>
</h1>
    <ProductSlideshow></ProductSlideshow>
    </main>)
// return <Login></Login>
}


