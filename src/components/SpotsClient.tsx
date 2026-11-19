"use client";

import { useEffect, useState } from "react";
import { SpotDestino, TipoSpot } from "@/types/rutasegura";

interface SpotsClientProps {
  spotsIniciales: SpotDestino[];
}

export function SpotsClient({ spotsIniciales }: SpotsClientProps) {
  const [tipoFiltro, setTipoFiltro] = useState<"todos" | TipoSpot>("todos");
  const [soloPetFriendly, setSoloPetFriendly] = useState(false);
  const [favoritos, setFavoritos] = useState<string[]>(["spot-mirador-volcan"]);

  useEffect(() => {
    localStorage.setItem("rutasegura_spots_favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorito = (id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const spotsFiltrados = spotsIniciales.filter((spot) => {
    const coincideTipo = tipoFiltro === "todos" || spot.tipo === tipoFiltro;
    const coincidePet = !soloPetFriendly || spot.petFriendly;
    return coincideTipo && coincidePet;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap gap-2">
          {(["todos", "cafe", "mirador", "sendero"] as const).map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => setTipoFiltro(tipo)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                tipoFiltro === tipo
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tipo === "todos" ? "Todos" : tipo}
            </button>
          ))}
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={soloPetFriendly}
            onChange={(e) => setSoloPetFriendly(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Solo pet-friendly ({favoritos.length} favoritos guardados)
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {spotsFiltrados.map((spot) => {
          const esFavorito = favoritos.includes(spot.id);
          return (
            <article
              key={spot.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium uppercase text-slate-700">
                    {spot.tipo}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleFavorito(spot.id)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                      esFavorito
                        ? "border-amber-300 bg-amber-50 text-amber-800"
                        : "border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {esFavorito ? "★ Guardado" : "☆ Guardar"}
                  </button>
                </div>

                <h2 className="mt-3 text-base font-semibold text-slate-900">{spot.nombre}</h2>
                <p className="text-xs text-slate-500">{spot.zona}</p>
                <p className="mt-2 text-sm text-slate-600">{spot.nota}</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span>Horario: {spot.horario}</span>
                <span>{spot.petFriendly ? "Pet-friendly" : "Solo visitantes"}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}