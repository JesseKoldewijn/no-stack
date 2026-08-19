import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('returns product shape with computed price', async () => {
    const service = new ProductsService();
    const promise = service.findOne('1');
    await vi.runAllTimersAsync();
    const product = await promise;

    expect(product).toEqual({
      id: '1',
      name: 'Product 1',
      price: 202,
    });
  });

  it('computes price from product id', async () => {
    const service = new ProductsService();
    const promise = service.findOne('3');
    await vi.runAllTimersAsync();
    const product = await promise;

    expect(product.price).toBe(208);
  });
});
