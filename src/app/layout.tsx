import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "RutaSegura SV | Monitor de Rutas y Spots",
  description:
    "Aplicación web desarrollada con Next.js 16 App Router, TypeScript y Tailwind CSS para monitorear rutas, cafés y reportes de condición en El Salvador.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          RutaSegura SV · Proyecto Next.js 16 App Router + TypeScript + Tailwind CSS
        </footer>
      </body>
    </html>
  );
}