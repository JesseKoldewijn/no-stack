import { hydrateRoot } from 'octane';

import './app.css';

import { createAppRouter } from '../router/create-app-router';
import { RouterProvider } from '../router/RouterProvider.tsrx';

async function bootstrap() {
  const container = document.getElementById('app');
  if (!container) return;

  // Theme init must happen before hydration so `dark:*` styles match immediately.
  try {
    const stored = localStorage.getItem('nost-theme');
    if (stored === 'dark' || stored === 'light') {
      document.documentElement.classList.toggle('dark', stored === 'dark');
    } else {
      const prefersDark =
        typeof window !== 'undefined' &&
        'matchMedia' in window &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  } catch {
    // Ignore storage errors and fall back to system preference.
    const prefersDark =
      typeof window !== 'undefined' &&
      'matchMedia' in window &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
  }

  const router = createAppRouter();
  await router.load();

  hydrateRoot(container, RouterProvider, { router });
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});
