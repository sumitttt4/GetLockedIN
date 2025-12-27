import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GetLockedIN - Don't just set resolutions. Go to war for them.",
  description: "The ultimate Build in Public protocol where your habits determine your social status. Join the war against mediocrity.",
  metadataBase: new URL('https://getlockedin.live'),
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "GetLockedIN - 2025 Protocol",
    description: "Don't just set resolutions. Go to war for them. The ultimate accountability protocol.",
    url: 'https://getlockedin.live',
    siteName: 'GetLockedIN',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "GetLockedIN - 2025 Protocol",
    description: "Don't just set resolutions. Go to war for them.",
    creator: '@GetLockedIN',
  },
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
      </body>
    </html>
  );
}
