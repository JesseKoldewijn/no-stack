import { hydrateRoot } from 'octane';

import './app.css';

import { ProductPage } from '../views/ProductPage.tsrx';
import { HomePage } from '../views/HomePage.tsrx';

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

  const productId = container.getAttribute('data-product-id');

  if (productId) {
    // Hydration fallback: if SSR hydration seeds aren't adopted as expected,
    // we still fetch the product so the page can render correctly.
    const productPromise = fetch(`/products/api/${productId}`).then((r) => r.json());
    hydrateRoot(container, ProductPage, { productId, productPromise });
    return;
  }

  // Home route hydration (theme toggle button lives here).
  hydrateRoot(container, HomePage);
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
});

