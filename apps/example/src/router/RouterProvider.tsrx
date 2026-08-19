import { RouterContext } from './context';
import { Matches } from './Matches.tsrx';
import type { AppRouter } from './create-app-router';

export type RouterProviderProps = {
  router: AppRouter;
};

export function RouterProvider({ router }: RouterProviderProps) {
  return (
    <RouterContext.Provider value={router}>
      <Matches />
    </RouterContext.Provider>
  );
}
