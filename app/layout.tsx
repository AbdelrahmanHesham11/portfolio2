import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdo's Portfolio",
  description: "A portfolio as living documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
