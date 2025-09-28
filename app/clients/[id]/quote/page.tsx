"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabaseClient";

function formatDate(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export default function ClientQuotePage() {
  const { id } = useParams();
  const [client, setClient] = useState<any>(null);

  // Dates for disclosure
  const today = new Date();
  const expires = new Date(today);
  expires.setDate(expires.getDate() + 14);

  // Load client data
  useEffect(() => {
    const fetchClient = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error(error);
      else setClient(data);
    };
    if (id) fetchClient();
  }, [id]);

  if (!client) return <p>Loading quote...</p>;

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        maxWidth: "700px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        background: "#fff",
      }}
    >
      {/* Company Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "28px", color: "#0B1D33", marginBottom: "5px" }}>
          Mulch This Trim That
        </h1>
        <p style={{ margin: 0, fontSize: "14px" }}>
          Justin Estrada · PH: 502-758-2396 · Email: mulchthistrimthat@gmail.com
        </p>
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/* Client Info */}
      <div style={{ marginBottom: "20px" }}>
        <p><strong>Client:</strong> {client.name}</p>
        <p><strong>Address:</strong> {client.address}</p>
        <p><strong>Phone:</strong> {client.phone}</p>
        <p><strong>Email:</strong> {client.email}</p>
      </div>

      {/* Quote Details */}
      <div
        style={{
          padding: "15px",
          background: "#f9f9f9",
          borderRadius: "6px",
        }}
      >
        <p><strong>Services:</strong></p>
        <p>{client.services}</p>
        <p><strong>Price:</strong> ${client.price}</p>
        {client.notes && (
          <>
            <p><strong>Notes:</strong></p>
            <p>{client.notes}</p>
          </>
        )}
      </div>

      {/* Thank You + Disclosure */}
      <div style={{ marginTop: "30px", fontSize: "14px", color: "#333" }}>
        <p>Quote date: {formatDate(today)}</p>
        <p>This quote is valid for 14 days and expires on {formatDate(expires)}.</p>
        <p>Thank you for the opportunity to earn your business.</p>
        <p>
          <em>
            Payment is due at the time of service. Please review carefully and confirm your agreement by replying "Agree" in your text.
          </em>
        </p>
      </div>
    </div>
  );
}

