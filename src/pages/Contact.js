"use client";
import { useState, useEffect } from "react";

export default function ContactDiary() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "Farmer",
    location: "",
    notes: "",
  });

  const [editingContact, setEditingContact] = useState(null);

  // Load
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("contacts"));
    if (data) setContacts(data);
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = () => {
    if (!form.name || !form.phone) {
      alert("Name & Phone required");
      return;
    }

    setContacts([{ ...form, id: Date.now() }, ...contacts]);

    setForm({
      name: "",
      phone: "",
      type: "Farmer",
      location: "",
      notes: "",
    });
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const openEdit = (contact) => {
    setEditingContact(contact);
  };

  const updateContact = () => {
    setContacts(
      contacts.map((c) =>
        c.id === editingContact.id ? editingContact : c
      )
    );
    setEditingContact(null);
  };

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const farmerCount = contacts.filter(c => c.type === "Farmer").length;
  const consumerCount = contacts.filter(c => c.type === "Consumer").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">📒 Contact Diary Dashboard</h1>
          <p className="text-gray-500">Manage your contacts efficiently</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow">
            <p>Total</p>
            <h2 className="text-xl font-bold">{contacts.length}</h2>
          </div>

          <div className="bg-green-100 p-4 rounded-2xl shadow">
            <p>Farmers</p>
            <h2 className="text-xl font-bold">{farmerCount}</h2>
          </div>

          <div className="bg-blue-100 p-4 rounded-2xl shadow">
            <p>Consumers</p>
            <h2 className="text-xl font-bold">{consumerCount}</h2>
          </div>
        </div>

        {/* Search */}
        <input
          className="w-full p-3 mb-6 border rounded-xl"
          placeholder="🔍 Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Form */}
        <div className="bg-white p-5 rounded-2xl shadow mb-6">
          <h2 className="mb-3 font-semibold">➕ Add Contact</h2>

          <div className="grid md:grid-cols-2 gap-3">
            <input
              className="p-2 border rounded"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="p-2 border rounded"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <select
              className="p-2 border rounded"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Farmer</option>
              <option>Consumer</option>
            </select>

            <input
              className="p-2 border rounded"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <input
              className="p-2 border rounded md:col-span-2"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <button
            onClick={addContact}
            className="mt-4 w-full bg-green-600 text-white p-2 rounded"
          >
            Add Contact
          </button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg"
            >
              <h3 className="font-bold">{c.name}</h3>
              <p>📞 {c.phone}</p>
              <p>📍 {c.location}</p>

              <span className="text-sm text-gray-500">{c.type}</span>

              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => openEdit(c)}
                  className="text-blue-600 text-sm"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() => deleteContact(c.id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EDIT MODAL */}
        {editingContact && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-2xl w-[90%] max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit Contact</h2>

              <input
                className="p-2 border rounded w-full mb-2"
                value={editingContact.name}
                onChange={(e) =>
                  setEditingContact({
                    ...editingContact,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="p-2 border rounded w-full mb-2"
                value={editingContact.phone}
                onChange={(e) =>
                  setEditingContact({
                    ...editingContact,
                    phone: e.target.value,
                  })
                }
              />

              <select
                className="p-2 border rounded w-full mb-2"
                value={editingContact.type}
                onChange={(e) =>
                  setEditingContact({
                    ...editingContact,
                    type: e.target.value,
                  })
                }
              >
                <option>Farmer</option>
                <option>Consumer</option>
              </select>

              <input
                className="p-2 border rounded w-full mb-2"
                value={editingContact.location}
                onChange={(e) =>
                  setEditingContact({
                    ...editingContact,
                    location: e.target.value,
                  })
                }
              />

              <input
                className="p-2 border rounded w-full mb-4"
                value={editingContact.notes}
                onChange={(e) =>
                  setEditingContact({
                    ...editingContact,
                    notes: e.target.value,
                  })
                }
              />

              <div className="flex justify-between">
                <button
                  onClick={() => setEditingContact(null)}
                  className="text-gray-500"
                >
                  Cancel
                </button>

                <button
                  onClick={updateContact}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
