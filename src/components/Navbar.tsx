"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/rutas", label: "Rutas" },
  { href: "/spots", label: "Spots y Cafés" },
  { href: "/reportes", label: "Reportes" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-600" />
          <span>{process.env.NEXT_PUBLIC_APP_NAME || "RutaSegura SV"}</span>
        </Link>

        {/* Navegación escritorio */}
        <nav className="hidden gap-2 md:flex" aria-label="Navegación principal">
          {LINKS.map((link) => {
            const activo = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  activo
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Botón menú móvil */}
        <button
          type="button"
          onClick={() => setMenuAbierto((prev) => !prev)}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 md:hidden"
          aria-expanded={menuAbierto}
        >
          {menuAbierto ? "Cerrar" : "Menú"}
        </button>
      </div>

      {/* Navegación móvil */}
      {menuAbierto && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1.5">
            {LINKS.map((link) => {
              const activo = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuAbierto(false)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${
                    activo
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}