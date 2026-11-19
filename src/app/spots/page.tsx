import { SpotsClient } from "@/components/SpotsClient";
import { SPOTS_INICIALES } from "@/data/seedData";

export default function SpotsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Cafés, Miradores y Senderos</h1>
        <p className="mt-1 text-sm text-slate-600">
          Explora paradas recomendadas en zonas de altura y guarda tus lugares favoritos en el
          navegador.
        </p>
      </div>
      <SpotsClient spotsIniciales={SPOTS_INICIALES} />
    </div>
  );
}