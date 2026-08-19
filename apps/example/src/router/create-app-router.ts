import { createMemoryHistory, createBrowserHistory } from '@tanstack/history';
import { createRouter } from '@tanstack/react-router';

import type { ProductsService } from '../products/products.service';

import { routeTree } from './route-tree';

export type AppRouterContext = {
  productsService?: ProductsService;
};

export function createAppRouter(url?: string, context: AppRouterContext = {}) {
  const isServer = typeof window === 'undefined';

  return createRouter({
    routeTree,
    context,
    history: isServer
      ? createMemoryHistory({ initialEntries: [url ?? '/'] })
      : createBrowserHistory(),
    defaultPreload: 'intent',
  });
}

export type AppRouter = ReturnType<typeof createAppRouter>;
