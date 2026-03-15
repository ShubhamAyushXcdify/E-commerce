"use client"

import { useEffect, useState, useMemo } from "react"
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
  const [error, setError] = useState("")

  /* FETCH USERS */

  const fetchUsers = async () => {
    try {

      const res = await fetch("https://fakestoreapi.com/users")

      if (!res.ok) {
        throw new Error("Failed to fetch users")
      }

      const data = await res.json()
      setUsers(data)

    } catch (err) {
      console.error(err)
      setError("Failed to load customers")

    } finally {
      setLoading(false)
    }
  }

  /* DELETE USER */

  const deleteUser = async (id: number) => {

    const confirmDelete = confirm("Are you sure you want to delete this customer?")
    if (!confirmDelete) return

    try {

      const res = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "DELETE"
      })

      if (!res.ok) {
        throw new Error("Failed to delete user")
      }

      setUsers(prev => prev.filter(user => user.id !== id))

    } catch (err) {
      console.error(err)
      setError("Failed to delete user")
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  /* FILTER USERS (OPTIMIZED) */

  const filteredUsers = useMemo(() => {
    return users.filter(user => {

      const fullName =
        `${user.name.firstname} ${user.name.lastname}`.toLowerCase()

      return fullName.includes(search.toLowerCase())

    })
  }, [users, search])

  /* LOADING STATE */

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-lg">Loading customers...</h2>
      </div>
    )
  }

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-semibold mb-1">
        Customers
      </h1>

      <p className="text-gray-600 mb-5">
        Total Customers: {filteredUsers.length}
      </p>

      {/* ERROR MESSAGE */}

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {/* SEARCH + ADD BUTTON */}

      <div className="flex justify-between items-center mb-6">

        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-[280px]"
        />

        <Link href="/users/add">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Customer
          </button>
        </Link>

      </div>

      {/* USERS GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">

        {filteredUsers.length === 0 ? (

          <p>No customers found.</p>

        ) : (

          filteredUsers.map(user => (

            <div
              key={user.id}
              className="bg-white p-5 rounded-lg shadow text-center"
            >

              {/* AVATAR */}

              <div className="w-[50px] h-[50px] rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mx-auto mb-2">
                {user.name.firstname.charAt(0)}
              </div>

              {/* NAME */}

              <h3 className="font-semibold">
                {user.name.firstname} {user.name.lastname}
              </h3>

              {/* DETAILS */}

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

              {/* ACTION BUTTONS */}

              <div className="flex justify-center gap-3 mt-4">

                <Link href={`/users/${user.id}`}>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    View Profile
                  </button>
                </Link>

                <button
                  onClick={() => deleteUser(user.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  )
}