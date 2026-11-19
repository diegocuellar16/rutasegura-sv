"use client";

import { useEffect, useState } from "react";
import { EstadoBadge } from "@/components/EstadoBadge";
import { EstadoRuta, RutaTrayecto } from "@/types/rutasegura";

interface RutasClientProps {
  rutasIniciales: RutaTrayecto[];
}

export function RutasClient({ rutasIniciales }: RutasClientProps) {
  const [busqueda, setBusqueda] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState<"todas" | EstadoRuta>("todas");
  const [soloTrayectosCortos, setSoloTrayectosCortos] = useState(false);

  // Sincroniza el estado externo (sessionStorage) cada vez que cambia el filtro
  useEffect(() => {
    sessionStorage.setItem("rutasegura_filtro_estado", estadoFiltro);
  }, [estadoFiltro]);

  const rutasFiltradas = rutasIniciales.filter((ruta) => {
    const coincideTexto =
      ruta.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      ruta.origen.toLowerCase().includes(busqueda.toLowerCase()) ||
      ruta.destino.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado = estadoFiltro === "todas" || ruta.estado === estadoFiltro;
    const coincideDistancia = !soloTrayectosCortos || ruta.distanciaKm <= 25;

    return coincideTexto && coincideEstado && coincideDistancia;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-3">
        <div>
          <label htmlFor="buscar-ruta" className="block text-xs font-medium text-slate-600">
            Buscar origen, destino o ruta
          </label>
          <input
            id="buscar-ruta"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ej. Lourdes, Boquerón, Costa..."
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="estado-ruta" className="block text-xs font-medium text-slate-600">
            Filtrar por condición
          </label>
          <select
            id="estado-ruta"
            value={estadoFiltro}
            onChange={(e) => setEstadoFiltro(e.target.value as "todas" | EstadoRuta)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
          >
            <option value="todas">Todas las condiciones</option>
            <option value="fluida">Fluida</option>
            <option value="moderada">Moderada</option>
            <option value="precaucion">Precaución</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={soloTrayectosCortos}
              onChange={(e) => setSoloTrayectosCortos(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            Solo trayectos menores o iguales a 25 km
          </label>
        </div>
      </div>

      {rutasFiltradas.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <p className="text-sm text-slate-600">
            No se encontraron rutas con los filtros seleccionados.
          </p>
          <button
            type="button"
            onClick={() => {
              setBusqueda("");
              setEstadoFiltro("todas");
              setSoloTrayectosCortos(false);
            }}
            className="mt-3 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-medium text-white"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {rutasFiltradas.map((ruta) => (
            <article
              key={ruta.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">{ruta.nombre}</h2>
                  <p className="text-xs text-slate-500">
                    {ruta.origen} → {ruta.destino}
                  </p>
                </div>
                <EstadoBadge estado={ruta.estado} />
              </div>
              <p className="mt-3 text-sm text-slate-600">{ruta.resumen}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span>Distancia: {ruta.distanciaKm} km</span>
                <span>Tiempo estimado: {ruta.tiempoEstimadoMin} min</span>
                <span>{ruta.actualizadoHace}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}