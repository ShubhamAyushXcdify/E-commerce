"use client"

import { useEffect,useState } from "react"
import { useParams,useRouter } from "next/navigation"

export default function EditProductPage(){

const params = useParams()
const router = useRouter()
const id = params.id

const [title,setTitle] = useState("")
const [price,setPrice] = useState("")
const [description,setDescription] = useState("")
const [category,setCategory] = useState("")
const [image,setImage] = useState("")
const [message,setMessage] = useState("")

useEffect(()=>{

fetch(`https://fakestoreapi.com/products/${id}`)
.then(res=>res.json())
.then(data=>{

setTitle(data.title)
setPrice(data.price)
setDescription(data.description)
setCategory(data.category)
setImage(data.image)

})

},[id])

const handleUpdate = async(e:any)=>{

e.preventDefault()

const updatedProduct={
title,
price,
description,
category,
image
}

await fetch(`https://fakestoreapi.com/products/${id}`,{
method:"PUT",
body:JSON.stringify(updatedProduct),
headers:{
"Content-Type":"application/json"
}
})

setMessage("Product updated successfully")

setTimeout(()=>{
router.push("/shop")
},1000)

}

return(

<div className="p-10 flex justify-center">

<div className="bg-white p-6 rounded shadow w-96">

<h1 className="text-xl font-semibold mb-4">
Edit Product
</h1>

{message && <p className="text-green-600 mb-3">{message}</p>}

<form onSubmit={handleUpdate} className="flex flex-col gap-3">

<input value={title}
onChange={(e)=>setTitle(e.target.value)}
className="border p-2 rounded"/>

<input value={price}
onChange={(e)=>setPrice(e.target.value)}
className="border p-2 rounded"/>

<input value={category}
onChange={(e)=>setCategory(e.target.value)}
className="border p-2 rounded"/>

<input value={image}
onChange={(e)=>setImage(e.target.value)}
className="border p-2 rounded"/>

<textarea value={description}
onChange={(e)=>setDescription(e.target.value)}
className="border p-2 rounded"/>

<button className="bg-blue-600 text-white py-2 rounded">
Update Product
</button>

</form>

</div>

</div>

)

}