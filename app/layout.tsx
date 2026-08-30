import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { personal, education } from "@/data/cv";
import { translations, LANG_COOKIE, resolveLang } from "@/data/translations";

/**
 * Figtree stands in for the brand face (none was supplied); the CSS stack puts
 * the native UI face first, so macOS/iOS render system type and everything
 * else falls through to Figtree.
 */
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-core",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const DESCRIPTION =
  "Senior Software Engineer specializing in .NET, React, distributed systems, and backend architecture. Based in Istanbul, Turkey.";

export const metadata: Metadata = {
  metadataBase: new URL(personal.site),
  title: {
    default: "Ahmet Murat YILDIRIM",
    template: "%s — Ahmet Murat YILDIRIM",
  },
  description: DESCRIPTION,
  keywords: ["software engineer", ".NET", "React", "TypeScript", "backend", "Istanbul"],
  authors: [{ name: personal.name, url: personal.site }],
  creator: personal.name,
  alternates: {
    canonical: "/",
    languages: { en: "/", tr: "/" },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Ahmet Murat YILDIRIM",
    description:
      "Senior Software Engineer specializing in .NET, React, and distributed systems.",
    url: personal.site,
    siteName: "Ahmet Murat YILDIRIM",
    images: [{ url: "/logo.png", width: 1320, height: 560, alt: "AMY" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmet Murat YILDIRIM",
    description:
      "Senior Software Engineer specializing in .NET, React, and distributed systems.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: personal.site,
  email: `mailto:${personal.email}`,
  jobTitle: "Senior Software Engineer",
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Istanbul",
    addressCountry: "TR",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.university,
  },
  sameAs: [personal.linkedin, personal.github],
  knowsAbout: [
    ".NET",
    "ASP.NET Core",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Distributed Systems",
    "System Integration",
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const saved = cookieStore.get(LANG_COOKIE)?.value;
  const lang = resolveLang(saved);

  return (
    <html
      lang={lang}
      // Next 16 no longer overrides scroll-behavior on navigation unless asked.
      data-scroll-behavior="smooth"
      className={`${figtree.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          {translations[lang].nav.skip}
        </a>
        <LanguageProvider initialLang={lang}>{children}</LanguageProvider>
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
