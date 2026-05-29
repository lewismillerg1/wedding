import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lewis & Nicole — May 27, 2026",
  description: "Join us to celebrate the wedding of Lewis and Nicole.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} font-sans bg-white text-stone-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
