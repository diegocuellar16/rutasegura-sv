import { EstadoRuta } from "@/types/rutasegura";

const CONFIG_ESTADO: Record<EstadoRuta, { label: string; classes: string }> = {
  fluida: {
    label: "Fluida",
    classes: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  moderada: {
    label: "Moderada",
    classes: "bg-amber-100 text-amber-800 border-amber-200",
  },
  precaucion: {
    label: "Precaución",
    classes: "bg-rose-100 text-rose-800 border-rose-200",
  },
};

export function EstadoBadge({ estado }: { estado: EstadoRuta }) {
  const info = CONFIG_ESTADO[estado];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${info.classes}`}
    >
      {info.label}
    </span>
  );
}