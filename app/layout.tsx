"use client";

import "./globals.css";
import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const metadata: Metadata = {
  title: "Mulch This Trim That",
  description: "Client management app for Mulch This Trim That",
};

// Navigation bar as a client-only component
function NavBar() {
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ok = localStorage.getItem("mttt-authed");
      if (ok === "true") {
        setAuthed(true);
      }
    }
  }, []);

  const isQuotePage = pathname?.includes("/quote");

  if (!authed || isQuotePage) return null;

  return (
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
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}

