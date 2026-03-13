"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Address {
  city: string
  street: string
  number: number
  zipcode: string
}

interface Name {
  firstname: string
  lastname: string
}

interface User {
  id: number
  email: string
  username: string
  phone: string
  name: Name
  address: Address
}

export default function UsersPage() {

  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  /* FETCH USERS */

  useEffect(() => {

    fetch("https://fakestoreapi.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data)
        setLoading(false)
      })

  }, [])
//Delete User Function
    const deleteUser = async (id:number) => {

    await fetch(`https://fakestoreapi.com/users/${id}`,{
        method:"DELETE"
    })

        setUsers(users.filter(user => user.id !== id))
    }

  /* FILTER USERS */

  const filteredUsers = users.filter(user => {

    const fullName =
      `${user.name.firstname} ${user.name.lastname}`.toLowerCase()

    return fullName.includes(search.toLowerCase())

  })

  /* LOADING STATE */

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading customers...</h2>
      </div>
    )
  }

  return (

    <div style={container}>

      <h1 style={title}>Customers</h1>

      <p style={count}>
        Total Customers: {filteredUsers.length}
      </p>
        <Link href="/users/add">
            <button style={{...button, marginBottom:"20px"}}>
                Add Customer
            </button>
        </Link>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchInput}
      />

      {/* USERS GRID */}

      <div style={grid}>

        {filteredUsers.length === 0 ? (

          <p>No customers found.</p>

        ) : (

          filteredUsers.map(user => (

            <div key={user.id} style={card}>

              <div style={avatar}>
                {user.name.firstname.charAt(0)}
              </div>

              <h3>
                {user.name.firstname} {user.name.lastname}
              </h3>

              <p>
                <b>Email:</b> {user.email}
              </p>

              <p>
                <b>Phone:</b> {user.phone}
              </p>

              <p>
                <b>City:</b> {user.address.city}
              </p>

              <p>
                <b>Zipcode:</b> {user.address.zipcode}
              </p>

              <Link href={`/users/${user.id}`}>
                <button style={button}>
                  View Profile
                </button>
              </Link>
                <button style={{...button, background:"red"}}
                    onClick={()=>deleteUser(user.id)}>
                    Delete
                </button>

            </div>

          ))

        )}

      </div>

    </div>

  )
}

/* ---------- STYLES ---------- */

const container = {
  padding: "25px",
  background: "#f6f7fb",
  minHeight: "100vh"
}

const title = {
  marginBottom: "5px"
}

const count = {
  marginBottom: "20px",
  color: "#555"
}

const searchInput = {
  padding: "10px",
  width: "300px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginBottom: "25px"
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
  gap: "20px"
}

const card = {
  background: "#fff",
  padding: "18px",
  borderRadius: "10px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
  textAlign: "center" as const,
  transition: "all 0.2s ease",
  cursor: "pointer"
}

const avatar = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "#2874f0",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "18px",
  margin: "0 auto 10px"
}

const button = {
  marginTop: "12px",
  padding: "8px 14px",
  border: "none",
  background: "#2874f0",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer"
}