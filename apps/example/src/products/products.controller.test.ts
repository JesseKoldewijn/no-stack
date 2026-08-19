import { HttpStatus } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { IsrCache, OctaneRendererService } from '@nost/framework';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

function createResponse() {
  const send = vi.fn();
  const type = vi.fn().mockReturnValue({ send });
  const status = vi.fn().mockReturnValue({ type });
  return { res: { status } as never, send, type, status };
}

describe('ProductsController', () => {
  let renderToHtml: ReturnType<typeof vi.fn>;
  let isrCache: IsrCache;
  let controller: ProductsController;

  beforeEach(() => {
    renderToHtml = vi.fn().mockResolvedValue('<html><head></head><body>product</body></html>');
    isrCache = {
      get: vi.fn(),
      set: vi.fn(),
      isStale: vi.fn(),
    };

    controller = new ProductsController(
      new ProductsService(),
      { renderToHtml } as unknown as OctaneRendererService,
      isrCache,
    );
  });

  it('renders and caches on cache miss', async () => {
    vi.mocked(isrCache.get).mockReturnValue(undefined);
    const { res, send, type, status } = createResponse();

    await controller.renderProduct('1', res);

    expect(renderToHtml).toHaveBeenCalledOnce();
    expect(isrCache.set).toHaveBeenCalledWith(
      'product-1',
      '<html><head></head><body>product</body></html>',
      60_000,
    );
    expect(status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(type).toHaveBeenCalledWith('text/html');
    expect(send).toHaveBeenCalledWith('<html><head></head><body>product</body></html>');
  });

  it('returns fresh cached HTML without re-rendering', async () => {
    vi.mocked(isrCache.get).mockReturnValue({
      html: '<html><head></head><body>cached</body></html>',
      expiresAt: Date.now() + 10_000,
    });
    vi.mocked(isrCache.isStale).mockReturnValue(false);
    const { res, send } = createResponse();

    await controller.renderProduct('1', res);

    expect(renderToHtml).not.toHaveBeenCalled();
    expect(send).toHaveBeenCalledWith('<html><head></head><body>cached</body></html>');
  });

  it('returns stale cached HTML and revalidates in background', async () => {
    vi.mocked(isrCache.get).mockReturnValue({
      html: '<html><head></head><body>stale</body></html>',
      expiresAt: Date.now() - 1,
    });
    vi.mocked(isrCache.isStale).mockReturnValue(true);

    const revalidateSpy = vi
      .spyOn(controller as never, 'revalidatePageInBackground' as never)
      .mockResolvedValue(undefined as never);

    const { res, send } = createResponse();
    await controller.renderProduct('1', res);

    expect(renderToHtml).not.toHaveBeenCalled();
    expect(revalidateSpy).toHaveBeenCalledWith('1', 'product-1');
    expect(send).toHaveBeenCalledWith('<html><head></head><body>stale</body></html>');
  });

  it('returns product JSON from api route', async () => {
    vi.useFakeTimers();
    const promise = controller.getProductJson('2');
    await vi.runAllTimersAsync();
    const json = await promise;

    expect(json).toEqual({
      id: '2',
      name: 'Product 2',
      price: 205,
    });
    vi.useRealTimers();
  });
});
