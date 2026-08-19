# NOST Example App (Nest.js + Octane SSR/ISR)

This app is the MVP demo for the “NOST Stack” idea:

- NestJS is the HTTP/router layer.
- Octane renders `.tsrx` views on-demand via `octane/server` streaming.
- ISR-style caching is implemented as an in-memory stale-while-revalidate map.
- Tailwind CSS is compiled to a deterministic stylesheet (`/assets/hydrate.css`).
- A Vite-built client entry (`/assets/hydrate.js`) bootstraps `hydrateRoot`.

## Local build + run

From the monorepo root:

```bash
bun install
bun run build
bun run dev
```

Or run the example app only:

```bash
bun run --cwd apps/example build
bun run --cwd apps/example start
```

Test:

- SSR HTML: `http://localhost:3000/`
- SSR HTML: `http://localhost:3000/products/1`
- Stylesheet is served at: `http://localhost:3000/assets/hydrate.css`
- Hydration bootstrap module is served at: `http://localhost:3000/assets/hydrate.js`

## Tests

From the monorepo root:

```bash
bun run test              # all suites
bun run test:unit         # unit tests (framework + example)
bun run test:integration  # Nest/supertest + Octane integration
bun run test:e2e          # Playwright browser tests
```

Integration and e2e tests require a prior build (`bun run build`). Turbo runs build automatically for those tasks.

## Vercel deployment (single Node app)

This app includes [`vercel.json`](vercel.json) that:

1. Runs `dist/main.js` as a single `@vercel/node` function
2. Routes all paths to that entry
3. Includes the compiled client assets so `/assets/hydrate.js` and `/assets/hydrate.css` exist at runtime

### Recommended Vercel settings

- **Root Directory**: `apps/example`
- **Install Command**: `cd ../.. && bun install`
- **Build Command**: `cd ../.. && bun run --cwd apps/example build`
- **Output**: not required (we deploy the prebuilt `dist/` artifacts referenced by `vercel.json`)

### Important runtime paths
- `GET /` (HTML + hydrated home page with theme toggle)
- SSR endpoints are handled by Nest:
  - `GET /products/:id` (HTML)
  - `GET /products/api/:id` (JSON used as hydration fallback)
- Client hydration module served by Nest static middleware:
  - `GET /assets/hydrate.css` (compiled from `src/client/app.css`)
  - `GET /assets/hydrate.js` (built from `src/client/hydrate.ts`)

