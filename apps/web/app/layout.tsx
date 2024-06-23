import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "@repo/ui/styles.css";
import "./globals.css";

const fontLibreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
});

export const metadata: Metadata = {
  title: "Polar Edge Analytics",
  description: "Scouting for FRC, built by FRC Team 3506 YETI Robotics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontLibreFranklin.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
