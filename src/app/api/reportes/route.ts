import { NextRequest, NextResponse } from "next/server";
import { REPORTES_INICIALES } from "@/data/seedData";
import { EstadoRuta, ReporteCondicion } from "@/types/rutasegura";

const ESTADOS_VALIDOS: EstadoRuta[] = ["fluida", "moderada", "precaucion"];

// Almacén en memoria del servidor durante la sesión activa de ejecución
const reportesStore: ReporteCondicion[] = [...REPORTES_INICIALES];

export async function GET(request: NextRequest) {
  try {
    const estadoParam = request.nextUrl.searchParams.get("estado");

    if (estadoParam && estadoParam !== "todas") {
      if (!ESTADOS_VALIDOS.includes(estadoParam as EstadoRuta)) {
        return NextResponse.json(
          { error: "Parámetro 'estado' no válido. Usa: fluida, moderada o precaucion." },
          { status: 400 }
        );
      }

      const filtrados = reportesStore.filter((item) => item.estado === estadoParam);
      return NextResponse.json({ data: filtrados, total: filtrados.length }, { status: 200 });
    }

    return NextResponse.json({ data: reportesStore, total: reportesStore.length }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "No fue posible obtener los reportes en este momento." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "El cuerpo de la solicitud debe ser un objeto JSON válido." },
        { status: 400 }
      );
    }

    const { titulo, ubicacion, estado, detalle } = body as Record<string, unknown>;

    const tituloLimpio = typeof titulo === "string" ? titulo.trim() : "";
    const ubicacionLimpia = typeof ubicacion === "string" ? ubicacion.trim() : "";
    const detalleLimpio = typeof detalle === "string" ? detalle.trim() : "";

    if (tituloLimpio.length < 3) {
      return NextResponse.json(
        { error: "El título debe tener al menos 3 caracteres." },
        { status: 400 }
      );
    }

    if (ubicacionLimpia.length < 3) {
      return NextResponse.json(
        { error: "La ubicación debe tener al menos 3 caracteres." },
        { status: 400 }
      );
    }

    if (detalleLimpio.length < 5) {
      return NextResponse.json(
        { error: "El detalle debe tener al menos 5 caracteres." },
        { status: 400 }
      );
    }

    if (typeof estado !== "string" || !ESTADOS_VALIDOS.includes(estado as EstadoRuta)) {
      return NextResponse.json(
        { error: "Estado inválido. Debe ser 'fluida', 'moderada' o 'precaucion'." },
        { status: 400 }
      );
    }

    const horaFormateada = new Date().toLocaleTimeString("es-SV", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const nuevoReporte: ReporteCondicion = {
      id: `rep-${Date.now()}`,
      titulo: tituloLimpio,
      ubicacion: ubicacionLimpia,
      estado: estado as EstadoRuta,
      detalle: detalleLimpio,
      creadoEn: `Hoy, ${horaFormateada}`,
    };

    reportesStore.unshift(nuevoReporte);

    return NextResponse.json(
      { message: "Reporte registrado correctamente.", data: nuevoReporte },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al procesar la solicitud JSON del reporte." },
      { status: 400 }
    );
  }
}