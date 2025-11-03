import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QITECHS – Smart IT Solutions, Automation & AI Development",
  description:
    "QITECHS provides innovative IT solutions, AI agents, automation systems, and web development services in Pakistan. We build smart software to grow your business.",
  keywords: [
    "QITECHS",
    "AI Solutions",
    "Automation",
    "Web Development",
    "Software Company Pakistan",
    "Inventory System",
    "Attendance System",
    "Billing Software",
    "Finance Software",
  ],
  authors: [{ name: "QITECHS Team" }],
  creator: "QITECHS",
  metadataBase: new URL("https://www.qitechs.com"),
  openGraph: {
    title: "QITECHS – IT & Automation Solutions",
    description:
      "We deliver AI, automation, and web-based software solutions for businesses across Pakistan.",
    url: "https://www.qitechs.com",
    siteName: "QITECHS",
    images: [
      {
        url: "/qitechs-og-image.png", // apni image public folder me rakho
        width: 1200,
        height: 630,
        alt: "QITECHS – IT & Automation Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
