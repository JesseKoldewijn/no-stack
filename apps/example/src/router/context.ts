import { createContext, useContext } from 'octane';

import type { AnyRouter } from '@tanstack/react-router';

export const RouterContext = createContext<AnyRouter | null>(null);

export function useRouter(): AnyRouter {
  const router = useContext(RouterContext);
  if (!router) {
    throw new Error('useRouter must be used within RouterProvider');
  }

  return router;
}

export const MatchRouteContext = createContext<string | undefined>(undefined);
