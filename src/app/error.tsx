"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error capturado en RutaSegura SV:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Algo salió mal al cargar la vista
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {error.message || "Ocurrió un error inesperado al procesar la información."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Reintentar
      </button>
    </div>
  );
}