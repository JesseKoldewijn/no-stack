import { isServer } from '@tanstack/router-core/isServer';
import { useContext } from 'octane';

import { MatchRouteContext, useRouter } from './context';
import { useRouterStore } from './hooks';
import { Match } from './Match.tsrx';

export function Outlet() {
  const router = useRouter();
  const parentRouteId = useContext(MatchRouteContext);

  if (!parentRouteId) {
    return null;
  }

  if (isServer ?? router.isServer) {
    const matches = router.stores.matches.get();
    const parentIndex = matches.findIndex((match) => match.routeId === parentRouteId);
    const childRouteId = matches[parentIndex + 1]?.routeId;

    return (
      <MatchRouteContext.Provider value={childRouteId}>
        {childRouteId ? <Match routeId={childRouteId} /> : null}
      </MatchRouteContext.Provider>
    );
  }

  const childRouteId = useRouterStore(router.stores.matches, (matches) => {
    const parentIndex = matches.findIndex((match) => match.routeId === parentRouteId);
    return matches[parentIndex + 1]?.routeId;
  });

  return (
    <MatchRouteContext.Provider value={childRouteId}>
      {childRouteId ? <Match routeId={childRouteId} /> : null}
    </MatchRouteContext.Provider>
  );
}
