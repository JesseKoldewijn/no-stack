import { useSyncExternalStore } from 'octane';

type StoreLike<T> = {
  subscribe: (listener: () => void) => () => void;
  get: () => T;
};

export function useRouterStore<T, U = T>(
  store: StoreLike<T>,
  selector: (value: T) => U = (value) => value as unknown as U,
): U {
  return useSyncExternalStore(
    (onStoreChange) => store.subscribe(onStoreChange),
    () => selector(store.get()),
    () => selector(store.get()),
  );
}
