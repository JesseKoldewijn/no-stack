import { isServer } from '@tanstack/router-core/isServer';

import { MatchRouteContext, useRouter } from './context';
import { useRouterStore } from './hooks';

export type MatchProps = {
  routeId: string;
};

export function Match({ routeId }: MatchProps) {
  const router = useRouter();
  const route = router.routesById[routeId];

  if (isServer ?? router.isServer) {
    const match = router.stores.getMatchStore(routeId).get();
    return renderMatch(route, match, router, routeId);
  }

  const match = useRouterStore(router.stores.getMatchStore(routeId), (value) => value);

  if (!match || match.status === 'pending') {
    const Pending = route?.options.pendingComponent ?? router.options.defaultPendingComponent;
    return Pending ? <Pending /> : null;
  }

  if (match.status === 'error') {
    throw match.error;
  }

  return renderMatch(route, match, router, routeId);
}

function renderMatch(
  route: ReturnType<typeof useRouter>['routesById'][string] | undefined,
  match: { status?: string } | undefined,
  router: ReturnType<typeof useRouter>,
  routeId: string,
) {
  if (!match || match.status === 'pending') {
    const Pending = route?.options.pendingComponent ?? router.options.defaultPendingComponent;
    return Pending ? <Pending /> : null;
  }

  const Component = route?.options.component ?? router.options.defaultComponent;

  if (!Component) {
    return null;
  }

  return (
    <MatchRouteContext.Provider value={routeId}>
      <Component />
    </MatchRouteContext.Provider>
  );
}
