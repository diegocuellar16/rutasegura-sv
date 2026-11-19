export type EstadoRuta = "fluida" | "moderada" | "precaucion";

export type TipoSpot = "cafe" | "mirador" | "sendero";

export interface RutaTrayecto {
  id: string;
  nombre: string;
  origen: string;
  destino: string;
  distanciaKm: number;
  tiempoEstimadoMin: number;
  estado: EstadoRuta;
  actualizadoHace: string;
  resumen: string;
}

export interface SpotDestino {
  id: string;
  nombre: string;
  zona: string;
  tipo: TipoSpot;
  destacado: boolean;
  petFriendly: boolean;
  horario: string;
  nota: string;
}

export interface ReporteCondicion {
  id: string;
  titulo: string;
  ubicacion: string;
  estado: EstadoRuta;
  detalle: string;
  creadoEn: string;
}