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
  title: "Kreluna Store — Tutto il software che ti fa andare avanti",
  description:
    "Scopri app e strumenti selezionati per far crescere la tua attività, tutti in un unico marketplace.",
  keywords: [
    "Kreluna Store",
    "software per aziende",
    "app business",
    "marketplace software",
  ],
  openGraph: {
    title: "Kreluna Store",
    description: "Un unico marketplace. Infinite soluzioni per il tuo business.",
    type: "website",
    locale: "it_IT",
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
