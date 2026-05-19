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
  title: "Leandro Savat — Estudio de un colaborador · Ed. 03",
  description:
    "Soy un colaborador introspectivo, observador y profundamente curioso. Acompaño equipos y fundadores desde la investigación, la estrategia y el desarrollo — con calidez y mirada larga.",
  keywords: ["Leandro Savat", "Product Manager", "Ingeniería de Software", "Antropología", "Neurociencia", "Socio Estratégico"],
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
