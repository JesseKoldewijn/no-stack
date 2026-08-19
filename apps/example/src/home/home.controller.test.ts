import { HttpStatus } from '@nestjs/common';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { IsrCache } from '@nost/framework';

import { HomeController } from './home.controller';

describe('HomeController', () => {
  it('renders home HTML via OctaneRendererService', async () => {
    const renderToHtml = vi.fn().mockResolvedValue('<html><head></head><body>home</body></html>');
    const controller = new HomeController({ renderToHtml } as never);

    const send = vi.fn();
    const type = vi.fn().mockReturnValue({ send });
    const res = { status: vi.fn().mockReturnValue({ type }) } as never;

    await controller.renderHome(res);

    expect(renderToHtml).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(type).toHaveBeenCalledWith('text/html');
    expect(send).toHaveBeenCalledWith('<html><head></head><body>home</body></html>');
  });
});
