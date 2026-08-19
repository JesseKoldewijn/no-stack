import { rootRouteId } from '@tanstack/router-core';
import { isServer } from '@tanstack/router-core/isServer';
import { useContext } from 'octane';

import { MatchRouteContext, useRouter } from './context';
import { useRouterStore } from './hooks';
import { Match } from './Match.tsrx';

export function Matches() {
  const router = useRouter();

  if (isServer ?? router.isServer) {
    const matches = router.stores.matches.get();
    const routeId = matches[0]?.routeId;

    return (
      <MatchRouteContext.Provider value={routeId}>
        {routeId ? <Match routeId={routeId} /> : null}
      </MatchRouteContext.Provider>
    );
  }

  const routeId = useRouterStore(router.stores.matches, (matches) => matches[0]?.routeId);

  return (
    <MatchRouteContext.Provider value={routeId}>
      {routeId ? <Match routeId={routeId} /> : null}
    </MatchRouteContext.Provider>
  );
}

export function useMatchRouteId(): string | undefined {
  const router = useRouter();
  const contextRouteId = useContext(MatchRouteContext);

  if (contextRouteId) {
    return contextRouteId;
  }

  if (isServer ?? router.isServer) {
    return router.stores.matches.get()[0]?.routeId;
  }

  return useRouterStore(router.stores.matches, (matches) => matches[0]?.routeId);
}

export function useParams<TParams extends Record<string, string>>(opts?: {
  from?: string;
}): TParams {
  const router = useRouter();
  const routeId = opts?.from ?? useMatchRouteId();

  if (!routeId) {
    throw new Error('useParams requires an active route match');
  }

  if (isServer ?? router.isServer) {
    const match = router.stores.getMatchStore(routeId).get();
    return (match?._strictParams ?? match?.params ?? {}) as TParams;
  }

  return useRouterStore(router.stores.getMatchStore(routeId), (match) => {
    return (match?._strictParams ?? match?.params ?? {}) as TParams;
  }) as TParams;
}

export function useLoaderData<TData>(opts?: { from?: string }): TData {
  const router = useRouter();
  const routeId = opts?.from ?? useMatchRouteId();

  if (!routeId) {
    throw new Error('useLoaderData requires an active route match');
  }

  if (isServer ?? router.isServer) {
    const match = router.stores.getMatchStore(routeId).get();
    return match?.loaderData as TData;
  }

  return useRouterStore(router.stores.getMatchStore(routeId), (match) => {
    return match?.loaderData as TData;
  }) as TData;
}

export { rootRouteId };
