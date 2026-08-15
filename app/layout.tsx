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
  metadataBase: new URL(
    "https://kreluna-store-andrea.andreagadducci.chatgpt.site",
  ),
  title: "Kreluna Store — Tutto il software che ti fa andare avanti",
  description:
    "Scopri app e strumenti selezionati per te o per la tua azienda, tutti in un unico marketplace.",
  keywords: [
    "Kreluna Store",
    "software per aziende",
    "app business",
    "marketplace software",
  ],
  openGraph: {
    title: "Kreluna Store",
    description: "Per te. Per la tua azienda. Infinite soluzioni in un unico marketplace.",
    type: "website",
    locale: "it_IT",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kreluna Store — Per te. Per la tua azienda.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kreluna Store",
    description: "Per te. Per la tua azienda.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
