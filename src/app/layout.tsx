import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

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
          <div style={{ padding: "6rem 2rem" }}>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
