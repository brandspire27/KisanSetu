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

  // Load data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("contacts"));
    if (data) setContacts(data);
  }, []);

  // Save data
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
          <h1 className="text-3xl font-bold text-gray-800">
            📒 Contact Diary Dashboard
          </h1>
          <p className="text-gray-500">
            Manage your farmers & consumers efficiently
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-2xl shadow">
            <p className="text-gray-500 text-sm">Total Contacts</p>
            <h2 className="text-2xl font-bold">{contacts.length}</h2>
          </div>

          <div className="bg-green-100 p-4 rounded-2xl shadow">
            <p className="text-green-700 text-sm">Farmers</p>
            <h2 className="text-2xl font-bold">{farmerCount}</h2>
          </div>

          <div className="bg-blue-100 p-4 rounded-2xl shadow">
            <p className="text-blue-700 text-sm">Consumers</p>
            <h2 className="text-2xl font-bold">{consumerCount}</h2>
          </div>
        </div>

        {/* Search */}
        <input
          className="w-full p-3 mb-6 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="🔍 Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Form */}
        <div className="bg-white p-5 rounded-2xl shadow-md mb-6">
          <h2 className="font-semibold mb-3 text-lg">➕ Add New Contact</h2>

          <div className="grid md:grid-cols-2 gap-3">
            <input
              className="p-2 border rounded-lg"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="p-2 border rounded-lg"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <select
              className="p-2 border rounded-lg"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option>Farmer</option>
              <option>Consumer</option>
            </select>

            <input
              className="p-2 border rounded-lg"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <input
              className="p-2 border rounded-lg md:col-span-2"
              placeholder="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <button
            onClick={addContact}
            className="mt-4 w-full bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition"
          >
            Add Contact
          </button>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.length === 0 && (
            <p className="text-gray-500 text-center col-span-2">
              No contacts found
            </p>
          )}

          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-white/80 backdrop-blur-md border border-gray-200 p-5 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-lg font-bold text-gray-800">{c.name}</h3>

              <p className="text-sm text-gray-600 mt-1">📞 {c.phone}</p>
              <p className="text-sm text-gray-600">📍 {c.location}</p>

              {/* Type Badge */}
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                  c.type === "Farmer"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {c.type}
              </span>

              {c.notes && (
                <p className="text-xs text-gray-400 mt-2">
                  📝 {c.notes}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-4 mt-3">
                <a
                  href={`tel:${c.phone}`}
                  className="text-green-600 text-sm hover:underline"
                >
                  📞 Call
                </a>

                <button
                  onClick={() => deleteContact(c.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
