export default async function Cart(){
    const res = await fetch('https://fakestoreapi.com/carts')
    const data = res.json()
    return(<div>
         <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
    )
}
