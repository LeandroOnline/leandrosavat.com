import type { Metadata } from "next";
import { Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Leandro Savat — Technical Product Manager · Studio Ed. 03",
  description:
    "Technical Product Manager, AI Integration Leader, Web Engineer Specialist and Data Analytics. I help founders and high-performance teams build meaningful products with warmth and long-term vision.",
  keywords: [
    "Leandro Savat",
    "Technical Product Manager",
    "AI Integration Leader",
    "Web Engineer Specialist",
    "Data Analytics",
  ],
  authors: [{ name: "Leandro Savat" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303] text-[#f4f4f5] selection:bg-[#10b981]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
