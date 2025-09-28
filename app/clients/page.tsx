"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ClientsPage() {
  const router = useRouter();

  // Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [services, setServices] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [clients, setClients] = useState<any[]>([]);

  // Load clients
  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setClients(data);
  }

  // Handle submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("clients").insert([
      {
        name,
        phone,
        email,
        address,
        services,
        price,
        notes,
        // new fields
        quote_date: new Date().toISOString().split("T")[0], // today’s date
        date_scheduled: null,
        completed: false,
      },
    ]);

    if (error) {
      setMessage("❌ Error adding client: " + error.message);
    } else {
      setMessage("✅ Client added!");
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setServices("");
      setPrice("");
      setNotes("");
      fetchClients();
    }
  }

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        background: "#F9FAFB",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#0B1D33",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white", fontSize: "2rem", margin: 0 }}>
          Mulch This Trim That
        </h1>
        <p style={{ color: "white", margin: 0 }}>
          Justin Estrada · PH: 502-758-2396 · mulchthistrimthat@gmail.com
        </p>
      </header>

      {/* Form */}
      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#0B1D33" }}>Add a Client</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />

          <label>Phone:</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />

          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <label>Address:</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyle}
          />

          <label>Services:</label>
          <textarea
            value={services}
            onChange={(e) => setServices(e.target.value)}
            style={textareaStyle}
          />

          <label>Price:</label>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
          >
            <span style={{ marginRight: "5px" }}>$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
          </div>

          <label>Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={textareaStyle}
          />

          <button type="submit" style={buttonStyle}>
            Add Client
          </button>
        </form>

        {message && <p style={{ marginTop: "15px" }}>{message}</p>}
      </div>

      {/* Client List */}
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
        <h2 style={{ color: "#0B1D33" }}>Client List</h2>
        <ul>
          {clients.map((c) => (
            <li key={c.id} style={{ marginBottom: "10px" }}>
              <a
                href={`/clients/${c.id}`}
                style={{ color: "#2E8B57", marginRight: "10px" }}
              >
                Edit
              </a>
              |
              <a
                href={`/clients/${c.id}/quote`}
                style={{ color: "#0B1D33", marginLeft: "10px" }}
              >
                View Quote
              </a>
              {" — "}
              {c.name} (${c.price}){" "}
              {c.completed ? "✅ Completed" : c.date_scheduled ? "📅 Scheduled" : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Reusable styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  height: "80px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#2E8B57",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "1rem",
  cursor: "pointer",
}; 
