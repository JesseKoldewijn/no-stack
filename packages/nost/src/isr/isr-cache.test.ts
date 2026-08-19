import { describe, expect, it } from 'vitest';

import { InMemoryIsrCache } from './isr-cache';

describe('InMemoryIsrCache', () => {
  it('returns undefined on cache miss', () => {
    const cache = new InMemoryIsrCache();
    expect(cache.get('missing')).toBeUndefined();
  });

  it('stores and retrieves HTML with TTL', () => {
    const cache = new InMemoryIsrCache();
    cache.set('page-1', '<html>cached</html>', 60_000);

    const entry = cache.get('page-1');
    expect(entry?.html).toBe('<html>cached</html>');
    expect(entry?.expiresAt).toBeGreaterThan(Date.now());
  });

  it('reports stale entries after expiry', () => {
    const cache = new InMemoryIsrCache();
    cache.set('page-1', '<html>cached</html>', 1_000);

    const entry = cache.get('page-1');
    expect(entry).toBeDefined();
    expect(cache.isStale(entry!.expiresAt, entry!.expiresAt)).toBe(false);
    expect(cache.isStale(entry!.expiresAt, entry!.expiresAt + 1)).toBe(true);
  });

  it('reports fresh entries before expiry', () => {
    const cache = new InMemoryIsrCache();
    cache.set('page-1', '<html>cached</html>', 5_000);

    const entry = cache.get('page-1');
    expect(cache.isStale(entry!.expiresAt, entry!.expiresAt - 1)).toBe(false);
  });
});
