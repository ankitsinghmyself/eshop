"use client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section style={{ padding: "6rem 2rem" }}>{children}</section>;
}
