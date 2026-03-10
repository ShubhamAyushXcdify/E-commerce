import AddCart from "./addCart"
import UpdateCart from "./updateCart"
export default async function Cart(){
    const res = await fetch('https://fakestoreapi.com/carts')
    const data = await res.json()
    return(<div>
         {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
         
         <AddCart></AddCart>
         <UpdateCart></UpdateCart>
    </div>
    )
}
