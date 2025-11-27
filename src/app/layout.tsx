import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anti-impulse-demo.vercel.app"),
  title: "Anti-Impulse Defense System",
  description: "Gamified PWA that helps you resist impulse purchases in real-time.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "Anti-Impulse Defense System",
    description: "Resist impulse buys with streaks, XP, and dopamine rewards.",
    url: "https://anti-impulse-demo.vercel.app",
    siteName: "Anti-Impulse Defense",
    images: [{ url: "/icon-512.png", width: 512, height: 512 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-slate-950 antialiased`}>
        <div className="min-h-dvh bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_50%)]">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
