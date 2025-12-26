import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LockedIn - Don't just set resolutions. Go to war for them.",
  description: "The ultimate Build in Public protocol where your habits determine your social status.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen antialiased overflow-x-hidden bg-black">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
