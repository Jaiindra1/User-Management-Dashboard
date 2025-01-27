import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  }); // State for the form
  const [isEditing, setIsEditing] = useState(false); // State to check if editing
  const [error, setError] = useState(null); // State for error handling

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      if (response.ok) {
        const users = await response.json();
        setUsers(users);
      } else {
        setError("Failed to fetch users");
      }
    } catch (error) {
      setError("Error fetching users");
      console.error(error);
    }
  };

  // Add a new user
  const addUser = async (data) => {
    console.log("Sending data:", data); // Log the data being sent
    try {
      const response = await fetch("http://localhost:5000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const newUser = await response.json();
        console.log("User added successfully:", newUser);
        setUsers([...users, newUser]); // Add the new user to the state
        resetForm();
      } else {
        console.error("Failed to add user. Status:", response.status);
        console.error("Response text:", await response.text());
        setError(`Failed to add user. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setError(`Error adding user: ${error.message}`);
    }
  };
  

  // Update an existing user
  const updateUser = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user.id === id ? updatedUser : user))); // Update the user in the list
        resetForm();
      } else {
        setError("Failed to update user");
      }
    } catch (error) {
      setError("Error updating user");
      console.error(error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id)); // Remove the user from the list
      } else {
        setError("Failed to delete user");
      }
    } catch (error) {
      setError("Error deleting user");
      console.error(error);
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateUser(formData.id, formData);
    } else {
      addUser(formData);
      window.location.reload();
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  // Reset form and editing state
  const resetForm = () => {
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    });
    setIsEditing(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>

      {/* Error Display */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* User List */}
      <h2>Users</h2>
<table>
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Department</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.id}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.department}</td>
        <td>
          <button onClick={() => handleEdit(user)}>Edit</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
      {/* Form */}
      <h2>{isEditing ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Department:
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <button type="submit">{isEditing ? "Update User" : "Add User"}</button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </form>
    </div>
  );
};

export default App;
