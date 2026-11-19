# RutaSegura SV

Aplicación web desarrollada con **Next.js 16+ (App Router)**, **TypeScript** y **Tailwind CSS** mediante el flujo de **Vibe Coding** para consultar rutas, explorar cafés y senderos de altura y registrar reportes de condición.

## Funcionalidades principales

- **4 rutas en App Router**:
  - `/` (`src/app/page.tsx`): Panel principal con métricas y estado rápido de rutas (Server Component).
  - `/rutas` (`src/app/rutas/page.tsx` + `src/components/RutasClient.tsx`): Búsqueda y filtrado por condición y distancia con `useState` y `useEffect`.
  - `/spots` (`src/app/spots/page.tsx` + `src/components/SpotsClient.tsx`): Directorio de cafés, miradores y senderos con filtro por tipo, opción *pet-friendly* y favoritos persistidos en `localStorage`.
  - `/reportes` (`src/app/reportes/page.tsx` + `src/components/ReportesClient.tsx`): Consumo en vivo del Route Handler `/api/reportes` (`GET` y `POST`) con estados de carga, validación y manejo de errores.
- **Estados de carga y error**: `src/app/loading.tsx` y `src/app/error.tsx`, además de estados locales en vistas interactivas.

## Variables de entorno

Copia `.env.example` a `.env.local` para desarrollo local:

```bash
cp .env.example .env.local