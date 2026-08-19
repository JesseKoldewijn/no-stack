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

1. Rewrites all paths to [`api/index.js`](api/index.js), a thin serverless entry
2. Delegates to the Vite-built Nest handler in `dist/main.js` (exports an Express-compatible function instead of calling `listen()` only)
3. Bundles `dist/**` via `functions.api/index.js.includeFiles` so SSR code and `/assets/hydrate.js` + `/assets/hydrate.css` exist at runtime

Run `bun run build` before deploy so `dist/` exists when Vercel packages the function.

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

