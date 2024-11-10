// src/app/(admin)/layout.tsx
import React from 'react';
// import AdminNavbar from '@/components/AdminNavbar';

export const metadata = {
  title: 'eShop Admin Dashboard',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      {/* <AdminNavbar /> */}
      <main>{children}</main>
      </body>
    </html>
  );
}
