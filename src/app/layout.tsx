import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maskani | Find a place to call home",
  description:
    "Discover rental homes across Nairobi and connect with landlords, agents and property managers.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
