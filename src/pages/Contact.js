"use client";
import { useEffect, useState } from "react";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "Farmer",
    location: "",
    notes: "",
  });

  const fetchContacts = async () => {
    const res = await fetch("/api/contacts");
    const data = await res.json();
    setContacts(data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async () => {
    await fetch("/api/contacts", {
      method: "POST",
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      phone: "",
      type: "Farmer",
      location: "",
      notes: "",
    });

    fetchContacts();
  };

  const deleteContact = async (id) => {
    await fetch(`/api/contacts/${id}`, {
      method: "DELETE",
    });

    fetchContacts();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">📒 Contact Diary</h1>

      {/* Form */}
      <div className="grid gap-2 my-4">
        <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Phone" onChange={(e)=>setForm({...form,phone:e.target.value})}/>
        <select onChange={(e)=>setForm({...form,type:e.target.value})}>
          <option>Farmer</option>
          <option>Consumer</option>
        </select>
        <input placeholder="Location" onChange={(e)=>setForm({...form,location:e.target.value})}/>
        <input placeholder="Notes" onChange={(e)=>setForm({...form,notes:e.target.value})}/>

        <button onClick={addContact} className="bg-green-600 text-white p-2">
          Add Contact
        </button>
      </div>

      {/* List */}
      <div>
        {contacts.map((c) => (
          <div key={c._id} className="border p-3 mb-2 rounded">
            <h3>{c.name}</h3>
            <p>{c.phone}</p>
            <p>{c.type}</p>
            <button onClick={() => deleteContact(c._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
