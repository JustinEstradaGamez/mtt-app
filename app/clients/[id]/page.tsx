"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function ClientDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [client, setClient] = useState<any>(null);
  const [message, setMessage] = useState("");

  // Password gate
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const PASSWORD = "MTTT1980";

  useEffect(() => {
    const savedAuth = localStorage.getItem("authed");
    if (savedAuth === "true") setAuthed(true);
  }, []);

  // Load client
  useEffect(() => {
    const fetchClient = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error(error);
      } else {
        setClient(data);
      }
    };

    if (authed && id) fetchClient();
  }, [authed, id]);

  // Handlers
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      setAuthed(true);
      localStorage.setItem("authed", "true");
    }
  };

  const handleSave = async () => {
    const { error } = await supabase.from("clients").update(client).eq("id", id);
    if (error) {
      console.error(error);
      setMessage("❌ Error saving client");
    } else {
      setMessage("✅ Client updated!");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this client? This action cannot be undone.")) {
      const { error } = await supabase.from("clients").delete().eq("id", id);
      if (error) {
        alert("❌ Error deleting client: " + error.message);
      } else {
        alert("✅ Client deleted successfully.");
        router.push("/clients");
      }
    }
  };

  const handleChange = (field: string, value: any) => {
    setClient((prev: any) => ({ ...prev, [field]: value }));
  };

  // Password prompt
  if (!authed) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "Arial" }}>
        <h2>Restricted Access</h2>
        <p>Please enter the password:</p>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter password"
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginRight: "10px",
              width: "200px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 15px",
              background: "#0B1D33",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Enter
          </button>
        </form>
        {input && input !== PASSWORD && (
          <p style={{ color: "red", marginTop: "10px" }}>❌ Wrong password</p>
        )}
      </div>
    );
  }

  if (!client) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading client...</p>;
  }

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "20px",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <header style={{ marginBottom: "20px", textAlign: "center" }}>
        <h1 style={{ color: "#0B1D33" }}>Edit Client</h1>
      </header>

      {/* Editable fields */}
      {["name", "phone", "email", "address", "services", "price", "notes"].map(
        (field) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            {field === "services" || field === "notes" ? (
              <textarea
                value={client[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                style={textareaStyle}
              />
            ) : (
              <input
                type={field === "price" ? "number" : "text"}
                value={client[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
                style={inputStyle}
              />
            )}
          </div>
        )
      )}

      {/* Quote Date (read-only) */}
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>Quote Date:</label>
        <input
          type="text"
          value={client.quote_date || ""}
          readOnly
          style={{ ...inputStyle, background: "#f5f5f5" }}
        />
      </div>

      {/* Date Scheduled */}
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "4px" }}>Date Scheduled:</label>
        <input
          type="date"
          value={client.date_scheduled || ""}
          onChange={(e) => handleChange("date_scheduled", e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Completed Checkbox */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            checked={!!client.completed}
            onChange={(e) => handleChange("completed", e.target.checked)}
          />
          Job Completed
        </label>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <button
          onClick={handleSave}
          style={{ ...buttonStyle, background: "#2E8B57" }}
        >
          Save Changes
        </button>

        <button
          onClick={() => router.push("/clients")}
          style={{ ...buttonStyle, background: "#555" }}
        >
          Back to Clients
        </button>

        <button
          onClick={() => router.push(`/clients/${id}/quote`)}
          style={{ ...buttonStyle, background: "#0B1D33" }}
        >
          View Quote
        </button>

        <button
          onClick={handleDelete}
          style={{ ...buttonStyle, background: "red" }}
        >
          Delete Client
        </button>
      </div>

      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}

// Styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  height: "80px",
};

const buttonStyle = {
  padding: "12px",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};


