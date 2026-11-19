import { RutasClient } from "@/components/RutasClient";
import { RUTAS_INICIALES } from "@/data/seedData";

export default function RutasPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Catálogo de Rutas</h1>
        <p className="mt-1 text-sm text-slate-600">
          Filtra corredores viales por texto, estado de circulación o distancia estimada.
        </p>
      </div>
      <RutasClient rutasIniciales={RUTAS_INICIALES} />
    </div>
  );
}