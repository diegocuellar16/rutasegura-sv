import { ReporteCondicion, RutaTrayecto, SpotDestino } from "@/types/rutasegura";

export const RUTAS_INICIALES: RutaTrayecto[] = [
  {
    id: "ruta-lourdes-tecla",
    nombre: "Lourdes Colón – Santa Tecla",
    origen: "Lourdes, Colón",
    destino: "Santa Tecla",
    distanciaKm: 13.5,
    tiempoEstimadoMin: 28,
    estado: "moderada",
    actualizadoHace: "Hace 12 min",
    resumen: "Tráfico denso en horas pico cerca de desvíos y comercios; calzada principal en buen estado.",
  },
  {
    id: "ruta-lourdes-costa",
    nombre: "Lourdes – Costa del Sol",
    origen: "Lourdes, Colón",
    destino: "Costa del Sol",
    distanciaKm: 78.0,
    tiempoEstimadoMin: 95,
    estado: "fluida",
    actualizadoHace: "Hace 25 min",
    resumen: "Circulación constante en tramos de carretera; precaución en zonas con neblina matinal o lluvia.",
  },
  {
    id: "ruta-tecla-boqueron",
    nombre: "Santa Tecla – El Boquerón",
    origen: "Santa Tecla",
    destino: "El Boquerón / El Volcán",
    distanciaKm: 14.2,
    tiempoEstimadoMin: 32,
    estado: "precaucion",
    actualizadoHace: "Hace 8 min",
    resumen: "Curvas cerradas y posible humedad en asfalto; mantener distancia prudente y luces encendidas.",
  },
];

export const SPOTS_INICIALES: SpotDestino[] = [
  {
    id: "spot-mirador-volcan",
    nombre: "Terraza Jardín del Volcán",
    zona: "El Boquerón / El Volcán",
    tipo: "cafe",
    destacado: true,
    petFriendly: true,
    horario: "08:00 – 19:30",
    nota: "Ambiente fresco de altura, café de especialidad y áreas verdes para caminar.",
  },
  {
    id: "spot-sendero-bruma",
    nombre: "Mirador y Sendero de la Bruma",
    zona: "El Volcán",
    tipo: "sendero",
    destacado: true,
    petFriendly: true,
    horario: "07:00 – 17:00",
    nota: "Sendero corto rodeado de vegetación; llevar abrigo ligero en la tarde.",
  },
  {
    id: "spot-cafe-colinas",
    nombre: "Café Mirador Las Colinas",
    zona: "Santa Tecla",
    tipo: "cafe",
    destacado: false,
    petFriendly: false,
    horario: "07:30 – 21:00",
    nota: "Buena opción para pausa corta, postres y vista panorámica hacia el valle.",
  },
];

export const REPORTES_INICIALES: ReporteCondicion[] = [
  {
    id: "rep-101",
    titulo: "Asfalto húmedo en curva de ascenso",
    ubicacion: "Santa Tecla – El Boquerón",
    estado: "precaucion",
    detalle: "Brisa ligera y pavimento húmedo después de las 15:00; conducir con calma.",
    creadoEn: "Hoy, 13:40",
  },
];