import React, { useState } from 'react'

const Dashboard = () => {

  const [formData, setformData] = useState([]);

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex">
        <h1 className="text-3xl">Users</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-left p-3 px-5">Role</th>
              <th></th>
            </tr>
            {[...Array(6)].map((_, index) => (
              <tr key={index} className="border-b hover:bg-orange-100 bg-gray-100">
                <td className="p-3 px-5">
                  <input type="text" value="user.name" className="bg-transparent border-b-2 border-gray-300 py-2" />
                </td>
                <td className="p-3 px-5">
                  <input type="text" value="user.email" className="bg-transparent border-b-2 border-gray-300 py-2" />
                </td>
                <td className="p-3 px-5">
                  <select value="user.role" className="bg-transparent border-b-2 border-gray-300 py-2">
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="p-3 px-5 flex justify-end">
                  <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                  <button type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Dashboard;
// import React, { useState } from 'react';

// const Dashboard = () => {
//   // Test user data
//   const initialUsers = [
//     { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin' },
//   ];

//   // State to hold user data
//   const [users, setUsers] = useState(initialUsers);
//   // State to hold form data for adding or editing user
//   const [formData, setFormData] = useState({ name: '', email: '', role: '' });

//   // Function to handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Function to handle user submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Logic to handle adding or editing user
//     // Here you can perform validation and then update the users state accordingly
//     // For simplicity, let's just add the new user to the users array
//     const newUser = { id: users.length + 1, ...formData };
//     setUsers([...users, newUser]);
//     // Reset the form data
//     setFormData({ name: '', email: '', role: '' });
//   };

//   // Function to handle deleting a user
//   const handleDeleteUser = (userId) => {
//     // Filter out the user with the given ID
//     const updatedUsers = users.filter((user) => user.id !== userId);
//     // Update the users state
//     setUsers(updatedUsers);
//   };

//   // Function to handle deleting all users
//   const handleDeleteAllUsers = () => {
//     // Clear the users array
//     setUsers([]);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">User Management</h1>

//       {/* Form for adding/editing user */}
//       <form onSubmit={handleSubmit} className="mb-4 space-y-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleInputChange}
//           className="border rounded mr-2 px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleInputChange}
//           className="border rounded mr-2 px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
//         />
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleInputChange}
//           className="border rounded mr-2 px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
//         >
//           <option value="">Select Role</option>
//           <option value="user">User</option>
//           <option value="admin">Admin</option>
//           <option value="moderator">Moderator</option>
//         </select>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500">
//           Add User
//         </button>
//       </form>

//       {/* Table to display users */}
//       <table className="w-full border-collapse border">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border border-gray-400 px-4 py-2">ID</th>
//             <th className="border border-gray-400 px-4 py-2">Name</th>
//             <th className="border border-gray-400 px-4 py-2">Email</th>
//             <th className="border border-gray-400 px-4 py-2">Role</th>
//             <th className="border border-gray-400 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td className="border border-gray-400 px-4 py-2">{user.id}</td>
//               <td className="border border-gray-400 px-4 py-2">{user.name}</td>
//               <td className="border border-gray-400 px-4 py-2">{user.email}</td>
//               <td className="border border-gray-400 px-4 py-2">{user.role}</td>
//               <td className="border border-gray-400 px-4 py-2">
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600 focus:outline-none focus:ring focus:border-red-500"
//                   onClick={() => handleDeleteUser(user.id)}
//                 >
//                   Delete
//                 </button>
//                 <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-500">Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Button to delete all users */}
//       {users.length > 0 && (
//         <button onClick={handleDeleteAllUsers} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-500">
//           Delete All Users
//         </button>
//       )}
//     </div>
//   );
// };

// export default Dashboard;