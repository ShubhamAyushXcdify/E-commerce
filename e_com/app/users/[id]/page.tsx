"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function UserProfile() {

  const { id } = useParams()

  const [user, setUser] = useState<any>(null)

  useEffect(() => {

    fetch(`https://fakestoreapi.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data))

  }, [id])

  if(!user){
    return <h2>Loading...</h2>
  }

  return(

    <div style={{padding:"30px"}}>

      <h2>
        {user.name.firstname} {user.name.lastname}
      </h2>

      <p>Email: {user.email}</p>

      <p>Phone: {user.phone}</p>

      <p>City: {user.address.city}</p>

    </div>
  )
}