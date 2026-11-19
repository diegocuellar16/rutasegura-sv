import { ReportesClient } from "@/components/ReportesClient";

export default function ReportesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reportes de Condición</h1>
        <p className="mt-1 text-sm text-slate-600">
          Consulta incidencias recientes y publica nuevos avisos mediante Route Handlers de
          Next.js.
        </p>
      </div>
      <ReportesClient />
    </div>
  );
}