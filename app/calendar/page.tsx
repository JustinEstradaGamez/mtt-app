"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// connect to Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type Client = {
  id: string;
  name: string;
  date_scheduled: string | null;
  services: string | null;
};

export default function CalendarPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("id, name, date_scheduled, services")
        .order("date_scheduled", { ascending: true });

      if (error) {
        console.error("Error fetching clients:", error);
      } else {
        setClients(data || []);
      }
    };

    fetchClients();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>📅 Jobs Calendar</h1>
      <p>This shows all scheduled jobs from the clients table.</p>

      {clients.filter(c => c.date_scheduled).length === 0 ? (
        <p>No jobs scheduled yet.</p>
      ) : (
        <ul>
          {clients
            .filter((c) => c.date_scheduled) // only show clients with a scheduled date
            .map((c) => (
              <li key={c.id} style={{ marginBottom: "10px" }}>
                <strong>{new Date(c.date_scheduled!).toDateString()}</strong>
                {" — "}
                {c.name} ({c.services || "No service listed"})
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}


