import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "../providers";

export const metadata: Metadata = {
  title: "ShopMate - Your Trusted E-commerce Platform",
  description: "Discover quality products at great prices. Shop electronics, fashion, home goods and more at ShopMate.",
  keywords: "ecommerce, shopping, online store, products, deals",
  authors: [{ name: "Ankit Singh" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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
