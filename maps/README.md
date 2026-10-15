# React + Vite

Muestra de mapas en paralelo: **OpenStreetMap** (Leaflet + react-leaflet) y **Google Maps** (Embed API oficial), con dark mode, TailwindCSS 4 y TypeScript.

## Scripts

| Comando                             | Qué hace                                                  |
| ----------------------------------- | --------------------------------------------------------- |
| `pnpm dev`                          | Dev server con HMR                                        |
| `pnpm build`                        | Typecheck (`tsc --noEmit`) + build de producción          |
| `pnpm typecheck`                    | Solo validación de tipos (TypeScript 7)                   |
| `pnpm lint`                         | Lint con [oxlint](https://oxlint.rs/) (`--deny-warnings`) |
| `pnpm format` / `pnpm format:check` | Formateo con Prettier                                     |
| `pnpm test` / `pnpm test:watch`     | Tests con Vitest + Testing Library (jsdom)                |
| `pnpm preview`                      | Preview del build de producción                           |

## Google Maps Embed API

Copy `.env.example` to `.env` and set `VITE_GOOGLE_MAPS_EMBED_API_KEY` to enable the official Google Maps Embed API iframe.

The app will show a fallback message until that key is available.
