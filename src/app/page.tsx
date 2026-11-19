import Link from "next/link";
import { EstadoBadge } from "@/components/EstadoBadge";
import { RUTAS_INICIALES, SPOTS_INICIALES } from "@/data/seedData";

export default function HomePage() {
  const rutasFluidasyModeradas = RUTAS_INICIALES.filter(
    (r) => r.estado !== "precaucion"
  ).length;
  const spotsDestacados = SPOTS_INICIALES.filter((s) => s.destacado);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-8">
      {/* Encabezado Hero */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs md:p-8">
        <p className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
          Monitoreo Vial y Destinos Locales
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Planifica tus trayectos y paradas en El Salvador
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          Consulta el estado actualizado de corredores clave, filtra cafés y senderos en
          zonas de altura y comparte reportes en tiempo real con otros conductores.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/rutas"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Explorar rutas
          </Link>
          <Link
            href="/reportes"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100"
          >
            Enviar reporte de condición
          </Link>
        </div>
      </section>

      {/* Tarjetas de métricas */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-medium text-slate-500">Rutas monitoreadas</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{RUTAS_INICIALES.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-medium text-slate-500">Corredores sin alerta crítica</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">{rutasFluidasyModeradas}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs font-medium text-slate-500">Spots recomendados</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{spotsDestacados.length}</p>
        </div>
      </section>

      {/* Vista rápida de rutas */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Estado rápido de rutas</h2>
          <Link href="/rutas" className="text-sm font-medium text-emerald-700 hover:underline">
            Ver todas →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {RUTAS_INICIALES.map((ruta) => (
            <article
              key={ruta.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-slate-900">{ruta.nombre}</h3>
                  <EstadoBadge estado={ruta.estado} />
                </div>
                <p className="mt-2 text-sm text-slate-600">{ruta.resumen}</p>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span>
                  {ruta.distanciaKm} km · ~{ruta.tiempoEstimadoMin} min
                </span>
                <span>{ruta.actualizadoHace}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}