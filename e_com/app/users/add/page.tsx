"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddUser() {

  const router = useRouter()

  const [firstname,setFirstname] = useState("")
  const [lastname,setLastname] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)

  const createUser = async () => {

    try {

      setLoading(true)

      const res = await fetch("https://fakestoreapi.com/users",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          username: firstname,
          password,
          name:{
            firstname,
            lastname
          }
        })
      })

      if(!res.ok){
        throw new Error("Failed to create user")
      }

      router.push("/users")

    } catch(err){
      console.error(err)
      setError("Failed to create user")

    } finally{
      setLoading(false)
    }

  }

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-semibold mb-6">
        Add Customer
      </h2>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      <div className="max-w-sm space-y-4">

        <input
          placeholder="First Name"
          value={firstname}
          onChange={(e)=>setFirstname(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          placeholder="Last Name"
          value={lastname}
          onChange={(e)=>setLastname(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={createUser}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create User"}
        </button>

      </div>

    </div>
  )
}