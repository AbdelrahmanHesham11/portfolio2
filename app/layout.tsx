import type { Metadata } from "next";
import "./globals.css";
import DynamicTitle from "@/components/DynamicTtitle"; // Adjust path as needed

export const metadata: Metadata = {
  title: "Abdo's Portfolio| Software engineer",
  description: "A portfolio website that speaks for me",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Added suppressHydrationWarning to fix that body error from before! */}
      <body suppressHydrationWarning>
        <DynamicTitle />
        {children}
      </body>
    </html>
  );
}