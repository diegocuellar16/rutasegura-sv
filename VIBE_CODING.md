---

### 2. Crear `VIBE_CODING.md` en la raíz del proyecto

Este documento registra el ciclo completo de Vibe Coding (sin incluir aclaraciones fuera del flujo principal): prompts principales, iteraciones, decisiones técnicas y desafíos resueltos.

Crea `VIBE_CODING.md`:

```markdown
# Proceso de Vibe Coding — RutaSegura SV

## 1. Concepción inicial del proyecto

Se definió **RutaSegura SV** como una aplicación web práctica para monitorear rutas frecuentes, explorar espacios con áreas verdes o senderos y publicar reportes de condición. Se optó por un alcance acotado pero completo con **Next.js 16+ App Router**, **TypeScript**, **Tailwind CSS** y un **Route Handler** en `/api/reportes`.

## 2. Prompts principales e iteraciones con IA

1. **Arranque y tipado (`src/types/rutasegura.ts`, `src/data/seedData.ts`, `loading.tsx`, `error.tsx`)**:
   - Se establecieron interfaces estrictas (`RutaTrayecto`, `SpotDestino`, `ReporteCondicion`) y datos semilla tipados para evitar duplicación y errores en tiempo de compilación.
2. **Endpoint interno y variables de entorno (`src/app/api/reportes/route.ts`, `.env.example`)**:
   - Se implementó `GET` (con filtro opcional por `estado`) y `POST` (con validación de longitud, sanitización con `trim()` y validación de enum `EstadoRuta`), devolviendo códigos HTTP `200`, `201`, `400` y `500`.
3. **Interfaz multi-ruta (`Navbar`, `/`, `/rutas`, `/spots`, `/reportes`)**:
   - Se separaron los componentes de servidor (carga inicial de datos y estructura de página) de los componentes de cliente (`"use client"`) encargados de filtros, `localStorage` y peticiones `fetch`.

## 3. Decisiones técnicas

- **App Router con separación Server/Client Components**: Permite renderizado rápido inicial en servidor y reactividad en cliente únicamente donde se requiere (`useState`, `useEffect`, eventos).
- **Route Handler interno (`/api/reportes`)**: Cumple el requisito de consumo de API sin depender de servicios externos adicionales durante la entrega, manteniendo contratos tipados compartidos.
- **Validación dual en `/reportes`**: Validación HTML (`required`, `minLength`) en el formulario y validación estricta en el servidor (`POST`) para rechazar payloads malformados.

## 4. Desafíos encontrados y resolución con apoyo de IA

- **Error de ESLint `react-hooks/set-state-in-effect` en Next.js 16 / React 19**:
  - *Problema*: Llamar a `setState` de forma síncrona dentro de `useEffect` (al leer almacenamiento o disparar recargas) provocó errores en `npm run lint`.
  - *Solución*: En `RutasClient.tsx` y `SpotsClient.tsx` se mantuvo `useEffect` para sincronizar el estado hacia el almacenamiento del navegador sin disparar `setState` síncrono en el cuerpo del efecto; en `ReportesClient.tsx` la consulta `async` a `/api/reportes` se ejecutó dentro de `useEffect` con bandera de cancelación (`activo`) y actualización de estado solo tras resolver la promesa.
  - *Verificación*: `npx tsc --noEmit`, `npm run lint` y `npm run build` finalizaron sin errores ni advertencias.