import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Ahmet Murat YILDIRIM",
  description: "Senior Software Engineer specializing in .NET, React, distributed systems, and backend architecture. Based in Istanbul, Turkey.",
  keywords: ["software engineer", ".NET", "React", "TypeScript", "backend", "Istanbul"],
  authors: [{ name: "Ahmet Murat Yıldırım" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Ahmet Murat YILDIRIM",
    description: "Senior Software Engineer specializing in .NET, React, and distributed systems.",
    url: "https://ahmetmuratyildirim.dev",
    siteName: "Ahmet Murat YILDIRIM",
    images: [{ url: "/logo.png", width: 1320, height: 560, alt: "AMY" }],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://ahmetmuratyildirim.dev"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">
        <ThemeProvider><LanguageProvider>{children}</LanguageProvider></ThemeProvider>
      </body>
    </html>
  );
}
