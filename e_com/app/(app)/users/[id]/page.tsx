// "use client"

// import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"

// export default function UserProfile() {

//   const { id } = useParams()

//   const [user, setUser] = useState<any>(null)

//   useEffect(() => {

//     fetch(`https://fakestoreapi.com/users/${id}`)
//       .then(res => res.json())
//       .then(data => setUser(data))

//   }, [id])

//   if (!user) {
//     return <h2 style={{ padding: "30px" }}>Loading user...</h2>
//   }

//   return (

//     <div style={container}>

//       <h1 style={title}>User Profile</h1>

//       <div style={profileWrapper}>

//         {/* LEFT PROFILE SECTION */}

//         <div style={leftSection}>

//           <div style={avatar}>
//             {user.name.firstname.charAt(0)}
//           </div>

//       <h3>
//            {user.name.firstname.charAt(0).toUpperCase() + user.name.firstname.slice(1)}{" "}
//            {user.name.lastname.charAt(0).toUpperCase() + user.name.lastname.slice(1)}
//       </h3>

//           <p style={{ color: "#777" }}>{user.email}</p>

//         </div>


//         {/* RIGHT PROFILE DETAILS */}

//         <div style={rightSection}>

//           <h3 style={{ marginBottom: "20px" }}>
//             Profile Information
//           </h3>

//           <div style={grid}>

//             <div>
//               <label>First Name</label>
//             <input
//             value={
//               user.name.firstname.charAt(0).toUpperCase() +
//               user.name.firstname.slice(1)
//             }
//             readOnly
//             style={input}/>  
//             </div>

//             <div>
//               <label>Last Name</label>
//             <input
//             value={
//               user.name.lastname.charAt(0).toUpperCase() +
//               user.name.lastname.slice(1)
//             }
//             readOnly
//             style={input}
//           />
//             </div>

//             <div>
//               <label>Username</label>
//               <input value={user.username} readOnly style={input}/>
//             </div>

//             <div>
//               <label>Phone</label>
//               <input value={user.phone} readOnly style={input}/>
//             </div>

//             <div>
//               <label>City</label>
//               <input value={user.address.city} readOnly style={input}/>
//             </div>

//             <div>
//               <label>Street</label>
//               <input value={user.address.street} readOnly style={input}/>
//             </div>

//             <div>
//               <label>Zipcode</label>
//               <input value={user.address.zipcode} readOnly style={input}/>
//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   )
// }



// /* ---------- STYLES ---------- */

// const container = {
//   padding: "40px",
//   background: "#f5f6fa",
//   minHeight: "100vh"
// }

// const title = {
//   marginBottom: "25px"
// }

// const profileWrapper = {
//   display: "flex",
//   gap: "40px",
//   background: "#fff",
//   padding: "30px",
//   borderRadius: "10px",
//   boxShadow: "0 3px 12px rgba(0,0,0,0.1)"
// }

// const leftSection = {
//   width: "250px",
//   textAlign: "center" as const
// }

// const avatar = {
//   width: "90px",
//   height: "90px",
//   borderRadius: "50%",
//   background: "#2874f0",
//   color: "#fff",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   fontSize: "34px",
//   fontWeight: "bold",
//   margin: "0 auto 15px"
// }

// const rightSection = {
//   flex: 1
// }

// const grid = {
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr",
//   gap: "20px"
// }

// const input = {
//   width: "100%",
//   padding: "8px",
//   marginTop: "5px",
//   border: "1px solid #ccc",
//   borderRadius: "5px"
// }



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

  if (!user) {
    return <h2 className="p-8 text-lg">Loading user...</h2>
  }

  return (

    <div className="p-10 bg-gray-100 min-h-screen">

      <h1 className="mb-6 text-2xl font-semibold">
        User Profile
      </h1>

      <div className="flex gap-10 bg-white p-8 rounded-lg shadow-md">

        {/* LEFT PROFILE SECTION */}

        <div className="w-[250px] text-center">

          <div className="w-[90px] h-[90px] rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
            {user.name.firstname.charAt(0)}
          </div>

          <h3 className="text-lg font-medium">

            {user.name.firstname.charAt(0).toUpperCase() +
              user.name.firstname.slice(1)}{" "}

            {user.name.lastname.charAt(0).toUpperCase() +
              user.name.lastname.slice(1)}

          </h3>

          <p className="text-gray-500">
            {user.email}
          </p>

        </div>


        {/* RIGHT PROFILE DETAILS */}

        <div className="flex-1">

          <h3 className="mb-5 text-lg font-semibold">
            Profile Information
          </h3>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="text-sm text-gray-600">First Name</label>
              <input
                value={
                  user.name.firstname.charAt(0).toUpperCase() +
                  user.name.firstname.slice(1)
                }
                readOnly
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                value={
                  user.name.lastname.charAt(0).toUpperCase() +
                  user.name.lastname.slice(1)
                }
                readOnly
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Username</label>
              <input
                value={user.username}
                readOnly
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                value={user.phone}
                readOnly
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">City</label>
              <input
                value={user.address.city}
                readOnly
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Street</label>
              <input
                value={user.address.street}
                readOnly
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Zipcode</label>
              <input
                value={user.address.zipcode}
                readOnly
                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}