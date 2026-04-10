import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Users</h1>

      {users.length === 0 && <p>No users found</p>}

      {users.map((user) => (
        <div key={user._id} style={{ marginBottom: "10px" }}>
          <p>
            {user.name} - {user.email}
          </p>
          <button onClick={() => deleteUser(user._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
