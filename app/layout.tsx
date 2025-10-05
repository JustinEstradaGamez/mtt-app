"use client";

import "./globals.css";
import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: "Mulch This Trim That",
  description: "Client management app for Mulch This Trim That",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    // Check if user is authed (set after entering password)
    if (typeof window !== "undefined") {
      const ok = localStorage.getItem("mttt-authed");
      if (ok === "true") {
        setAuthed(true);
      }
    }
  }, []);

  // Don’t show nav bar on quote pages
  const isQuotePage = pathname?.includes("/quote");

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        {/* Only show nav bar if authed AND not on a quote page */}
        {authed && !isQuotePage && (
          <header
            style={{
              padding: "10px",
              background: "#f5f5f5",
              display: "flex",
              gap: "20px",
            }}
          >
            <a
              href="/clients"
              style={{
                textDecoration: "none",
                color: "#0B1D33",
                fontWeight: "bold",
              }}
            >
              👥 Clients
            </a>
            <a
              href="/calendar"
              style={{
                textDecoration: "none",
                color: "#0B1D33",
                fontWeight: "bold",
              }}
            >
              📅 Calendar
            </a>
          </header>
        )}

        <main>{children}</main>
      </body>
    </html>
  );
}
