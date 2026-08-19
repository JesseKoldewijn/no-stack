import { createRootRouteWithContext, createRoute } from '@tanstack/react-router';

import { HomePage } from '../views/HomePage.tsrx';
import { ProductRoutePage } from '../views/ProductRoutePage.tsrx';

import { RootOutlet } from './RootOutlet.tsrx';
import type { AppRouterContext } from './create-app-router';

const rootRoute = createRootRouteWithContext<AppRouterContext>()({
  component: RootOutlet,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$id',
  loader: async ({ params, context }) => {
    if (context.productsService) {
      return context.productsService.findOne(params.id);
    }

    const response = await fetch(`/products/api/${params.id}`);
    if (!response.ok) {
      throw new Error(`Failed to load product ${params.id}`);
    }

    return response.json() as Promise<{ id: string; name: string; price: number }>;
  },
  component: ProductRoutePage,
});

export const routeTree = rootRoute.addChildren([indexRoute, productRoute]);

export { indexRoute, productRoute, rootRoute };
