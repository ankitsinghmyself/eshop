import React from 'react';

export const metadata = {
  title: 'eShop Admin Dashboard',
  description: 'Admin panel for eShop management',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
