import AddCart from "./addCart"
import UpdateCart from "./updateCart"
import UserProduct from "./displayCart"


export default async function Cart(){
    const res = await fetch('https://fakestoreapi.com/carts')
    const data = await res.json()
    return(<div>
         {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
         
         {/* <UpdateCart></UpdateCart> */}
         <UserProduct></UserProduct>
         <br></br>
         {/* <AddCart productId={8} /> */}
    </div>
    )
}

