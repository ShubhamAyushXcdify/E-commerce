"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddUser() {

  const router = useRouter()

  const [firstname,setFirstname] = useState("")
  const [lastname,setLastname] = useState("")
  const [email,setEmail] = useState("")

  const createUser = async () => {

    await fetch("https://fakestoreapi.com/users",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        username: firstname,
        password:"123456",
        name:{
          firstname,
          lastname
        }
      })
    })

    alert("User created!")

    router.push("/users")
  }

  return (

    <div style={{padding:"30px"}}>

      <h2>Add Customer</h2>

      <input
        placeholder="First Name"
        onChange={(e)=>setFirstname(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Last Name"
        onChange={(e)=>setLastname(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/><br/>

      <button onClick={createUser}>
        Create User
      </button>

    </div>
  )
}