import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mulch This Trim That",
  description: "Client management app for Mulch This Trim That",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        {/* Global Navigation */}
        <header style={{ padding: "10px", background: "#f5f5f5", display: "flex", gap: "20px" }}>
          <a href="/clients" style={{ textDecoration: "none", color: "#0B1D33", fontWeight: "bold" }}>👥 Clients</a>
          <a href="/calendar" style={{ textDecoration: "none", color: "#0B1D33", fontWeight: "bold" }}>📅 Calendar</a>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}

