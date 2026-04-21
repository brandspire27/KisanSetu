import React, { useState, useEffect } from "react";

const ContactDiary = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    type: "Farmer",
    location: "",
    notes: "",
  });

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("contacts"));
    if (saved) setContacts(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addContact = () => {
    if (!form.name || !form.phone) {
      alert("Name & Phone required");
      return;
    }

    setContacts([...contacts, { ...form, id: Date.now() }]);

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>📒 Contact Diary</h1>

      {/* Form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option>Farmer</option>
          <option>Consumer</option>
        </select>
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <input
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button onClick={addContact}>Add Contact</button>
      </div>

      {/* List */}
      <div>
        {contacts.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{c.name}</h3>
            <p>📞 {c.phone}</p>
            <p>👤 {c.type}</p>
            <p>📍 {c.location}</p>
            <p>📝 {c.notes}</p>

            <button onClick={() => deleteContact(c.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactDiary;
