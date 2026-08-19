export type IsrCacheEntry = {
  html: string;
  expiresAt: number;
};

export interface IsrCache {
  get(cacheKey: string): IsrCacheEntry | undefined;
  set(cacheKey: string, html: string, ttlMs: number): void;
  isStale(expiresAt: number, now?: number): boolean;
}

export class InMemoryIsrCache implements IsrCache {
  private readonly store = new Map<string, IsrCacheEntry>();

  get(cacheKey: string): IsrCacheEntry | undefined {
    return this.store.get(cacheKey);
  }

  set(cacheKey: string, html: string, ttlMs: number): void {
    const now = Date.now();
    this.store.set(cacheKey, { html, expiresAt: now + ttlMs });
  }

  isStale(expiresAt: number, now: number = Date.now()): boolean {
    return now > expiresAt;
  }
}

