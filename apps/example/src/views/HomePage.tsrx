export function HomePage() {
  return (
    <div class="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <header class="border-b border-slate-200 bg-white/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
        <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
              N
            </div>
            <div>
              <div class="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                The NOST Stack
              </div>
              <div class="text-lg font-bold">NestJS + Octane + SSR/ISR</div>
            </div>
          </div>

          <button
            class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-50 dark:hover:bg-slate-900"
            onClick={() => {
              if (typeof document === 'undefined') return;
              const root = document.documentElement;
              const nextDark = !root.classList.contains('dark');
              root.classList.toggle('dark', nextDark);
              try {
                localStorage.setItem('nost-theme', nextDark ? 'dark' : 'light');
              } catch {
                // Ignore storage errors in restricted environments.
              }
            }}
          >
            Toggle theme
          </button>
        </div>
      </header>

      <main class="mx-auto max-w-5xl px-6 py-10">
        <section class="space-y-4">
          <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl">
            A Nest-first engine for Octane SSR.
          </h1>
          <p class="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            This MVP keeps NestJS as the sole entry/router layer, while Octane renders `.tsrx`
            templates via streaming. ISR-style in-memory caching makes pages fast and resilient.
          </p>
        </section>

        <section class="mt-10 grid gap-4 md:grid-cols-3">
          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/20">
            <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">SSR</div>
            <div class="mt-2 text-xl font-bold">Render on demand</div>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              `renderToReadableStream()` buffers to HTML and hydrates on the client.
            </p>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/20">
            <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">ISR</div>
            <div class="mt-2 text-xl font-bold">Stale-while-revalidate</div>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              An in-memory cache returns immediately and refreshes asynchronously.
            </p>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/20">
            <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">Hydration</div>
            <div class="mt-2 text-xl font-bold">Octane `hydrateRoot`</div>
            <p class="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              The `/products/:id` page becomes interactive without a full reload.
            </p>
          </div>
        </section>

        <section class="mt-10 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/20">
          <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Try the demo
              </div>
              <div class="mt-1 text-2xl font-bold">Open a product page</div>
            </div>

            <div class="flex gap-3">
              <a
                class="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                href="/products/1"
              >
                /products/1
              </a>
              <a
                class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-50 dark:hover:bg-slate-900"
                href="/products/2"
              >
                /products/2
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

