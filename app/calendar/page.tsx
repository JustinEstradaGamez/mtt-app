"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// connect to Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type Job = {
  id: string;
  job_date: string;
  notes: string | null;
};

export default function CalendarPage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("id, job_date, notes")
        .order("job_date", { ascending: true });

      if (error) {
        console.error("Error fetching jobs:", error);
      } else {
        setJobs(data || []);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📅 Jobs Calendar</h1>
      <p>This is a simple calendar view of your scheduled jobs.</p>

      {jobs.length === 0 ? (
        <p>No jobs scheduled yet.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{new Date(job.job_date).toDateString()}</strong>
              {job.notes ? ` — ${job.notes}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


