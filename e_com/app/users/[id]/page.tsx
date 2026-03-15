"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

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

export default function UserProfile() {

  const { id } = useParams()

  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  /* FETCH USER */

  const fetchUser = async () => {
    try {

      const res = await fetch(`https://fakestoreapi.com/users/${id}`)

      if (!res.ok) {
        throw new Error("Failed to fetch user")
      }

      const data = await res.json()
      setUser(data)

    } catch (err) {
      console.error(err)
      setError("Failed to load user")

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [id])

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-lg">Loading user...</h2>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-8">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  const firstName =
    user.name.firstname.charAt(0).toUpperCase() +
    user.name.firstname.slice(1)

  const lastName =
    user.name.lastname.charAt(0).toUpperCase() +
    user.name.lastname.slice(1)

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-semibold mb-6">
        User Profile
      </h1>

      <div className="flex gap-10 bg-white p-8 rounded-lg shadow">

        {/* LEFT PROFILE SECTION */}

        <div className="w-[250px] text-center">

          <div className="w-[90px] h-[90px] rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
            {firstName.charAt(0)}
          </div>

          <h3 className="font-semibold text-lg">
            {firstName} {lastName}
          </h3>

          <p className="text-gray-500">
            {user.email}
          </p>

        </div>


        {/* RIGHT PROFILE DETAILS */}

        <div className="flex-1">

          <h3 className="mb-5 font-semibold">
            Profile Information
          </h3>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="block text-sm">First Name</label>
              <input
                value={firstName}
                readOnly
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="block text-sm">Last Name</label>
              <input
                value={lastName}
                readOnly
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="block text-sm">Username</label>
              <input
                value={user.username}
                readOnly
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="block text-sm">Phone</label>
              <input
                value={user.phone}
                readOnly
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="block text-sm">City</label>
              <input
                value={user.address.city}
                readOnly
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="block text-sm">Street</label>
              <input
                value={user.address.street}
                readOnly
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div>
              <label className="block text-sm">Zipcode</label>
              <input
                value={user.address.zipcode}
                readOnly
                className="w-full border p-2 rounded mt-1"
              />
            </div>

          </div>

        </div>

      </div>

    </div>

  )
}