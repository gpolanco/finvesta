import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/features/auth/context/auth-context";
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
  title: "Finvesta - Gestión de Finanzas Personales",
  description:
    "Optimiza tu patrimonio financiero con análisis inteligente de cripto, inversiones y ahorros",
  keywords: [
    "finanzas personales",
    "inversiones",
    "cripto",
    "ahorro",
    "patrimonio",
  ],
  authors: [{ name: "Finvesta" }],
  openGraph: {
    title: "Finvesta - Tu Dashboard Financiero Personal",
    description:
      "Controla tu patrimonio, optimiza tus inversiones y alcanza tus objetivos financieros",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
