import type { Metadata } from "next";
import "./globals.css";
import Providers from "../providers";

export const metadata: Metadata = {
  title: "eShop",
  description: "eShop website made by Ankit Singh",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div
            style={{
              background: "var(--primary-glow)",
              minHeight: "100vh",
            }}
          >
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
