"use client";

import { FormEvent, useEffect, useState } from "react";
import { EstadoBadge } from "@/components/EstadoBadge";
import { EstadoRuta, ReporteCondicion } from "@/types/rutasegura";

export function ReportesClient() {
  const [reportes, setReportes] = useState<ReporteCondicion[]>([]);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [errorCarga, setErrorCarga] = useState<string | null>(null);
  const [errorFormulario, setErrorFormulario] = useState<string | null>(null);
  const [exitoMensaje, setExitoMensaje] = useState<string | null>(null);
  const [recargaKey, setRecargaKey] = useState(0);

  const [titulo, setTitulo] = useState("");
  const [ubicacion, setUbicacion] = useState("Santa Tecla – El Boquerón");
  const [estado, setEstado] = useState<EstadoRuta>("moderada");
  const [detalle, setDetalle] = useState("");

  useEffect(() => {
    let activo = true;

    async function obtenerReportes() {
      try {
        const response = await fetch("/api/reportes", { cache: "no-store" });
        const json: { data?: ReporteCondicion[]; error?: string } = await response.json();

        if (!activo) return;

        if (!response.ok || !json.data) {
          throw new Error(json.error || "No se pudieron cargar los reportes.");
        }

        setReportes(json.data);
        setErrorCarga(null);
      } catch (err) {
        if (!activo) return;
        setErrorCarga(
          err instanceof Error ? err.message : "Error de red al obtener reportes."
        );
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    void obtenerReportes();

    return () => {
      activo = false;
    };
  }, [recargaKey]);

  const solicitarRecarga = () => {
    setCargando(true);
    setErrorCarga(null);
    setRecargaKey((prev) => prev + 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    setErrorFormulario(null);
    setExitoMensaje(null);

    try {
      const response = await fetch("/api/reportes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, ubicacion, estado, detalle }),
      });

      const json: { data?: ReporteCondicion; error?: string; message?: string } =
        await response.json();

      if (!response.ok || !json.data) {
        throw new Error(json.error || "No se pudo registrar el reporte.");
      }

      setReportes((prev) => [json.data!, ...prev]);
      setTitulo("");
      setDetalle("");
      setExitoMensaje(json.message || "Reporte publicado.");
    } catch (err) {
      setErrorFormulario(
        err instanceof Error ? err.message : "Error inesperado al enviar el reporte."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
      <section className="rounded-xl border border-slate-200 bg-white p-5 lg:col-span-2">
        <h2 className="text-base font-semibold text-slate-900">Nuevo reporte de condición</h2>
        <p className="mt-1 text-xs text-slate-500">
          Envía una actualización rápida al endpoint interno <code>/api/reportes</code>.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="rep-titulo" className="block text-xs font-medium text-slate-700">
              Título breve
            </label>
            <input
              id="rep-titulo"
              type="text"
              required
              minLength={3}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej. Neblina densa en mirador"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="rep-ubicacion" className="block text-xs font-medium text-slate-700">
              Ruta o zona
            </label>
            <input
              id="rep-ubicacion"
              type="text"
              required
              minLength={3}
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="rep-estado" className="block text-xs font-medium text-slate-700">
              Nivel de condición
            </label>
            <select
              id="rep-estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value as EstadoRuta)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
            >
              <option value="fluida">Fluida</option>
              <option value="moderada">Moderada</option>
              <option value="precaucion">Precaución</option>
            </select>
          </div>

          <div>
            <label htmlFor="rep-detalle" className="block text-xs font-medium text-slate-700">
              Observaciones
            </label>
            <textarea
              id="rep-detalle"
              rows={3}
              required
              minLength={5}
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              placeholder="Describe visibilidad, tráfico o estado del pavimento..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
            />
          </div>

          {errorFormulario && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">
              {errorFormulario}
            </div>
          )}

          {exitoMensaje && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">
              {exitoMensaje}
            </div>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {enviando ? "Publicando reporte..." : "Publicar reporte"}
          </button>
        </form>
      </section>

      <section className="space-y-4 lg:col-span-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Reportes recientes ({reportes.length})
          </h2>
          <button
            type="button"
            onClick={solicitarRecarga}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            Actualizar
          </button>
        </div>

        {cargando ? (
          <div className="space-y-3">
            <div className="h-24 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-24 animate-pulse rounded-xl bg-slate-200" />
          </div>
        ) : errorCarga ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">
            <p className="font-medium">Error al cargar los reportes</p>
            <p className="mt-1 text-xs">{errorCarga}</p>
            <button
              type="button"
              onClick={solicitarRecarga}
              className="mt-3 rounded-lg bg-rose-800 px-3 py-1.5 text-xs font-medium text-white"
            >
              Reintentar
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {reportes.map((rep) => (
              <article
                key={rep.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{rep.titulo}</h3>
                    <p className="text-xs text-slate-500">{rep.ubicacion}</p>
                  </div>
                  <EstadoBadge estado={rep.estado} />
                </div>
                <p className="mt-2 text-sm text-slate-600">{rep.detalle}</p>
                <p className="mt-3 text-right text-xs text-slate-400">{rep.creadoEn}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}