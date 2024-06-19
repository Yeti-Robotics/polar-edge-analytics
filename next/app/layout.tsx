import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";

const libreFranklin = Libre_Franklin({ subsets: ["latin"], variable: "--font-libre-franklin" });

export const metadata: Metadata = {
  title: "PolarEdge Analytics",
  description: "A NC FRC Scouting Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${libreFranklin.variable} font-sans`}>{children}</body>
    </html>
  );
}
