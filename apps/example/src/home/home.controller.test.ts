import { HttpStatus } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';

import { HomeController } from './home.controller';

describe('HomeController', () => {
  it('renders home HTML via PageRendererService', async () => {
    const renderUrl = vi.fn().mockResolvedValue('<html><head></head><body>home</body></html>');
    const controller = new HomeController({ renderUrl } as never);

    const send = vi.fn();
    const type = vi.fn().mockReturnValue({ send });
    const res = { status: vi.fn().mockReturnValue({ type }) } as never;

    await controller.renderHome(res);

    expect(renderUrl).toHaveBeenCalledWith('/');
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(type).toHaveBeenCalledWith('text/html');
    expect(send).toHaveBeenCalledWith('<html><head></head><body>home</body></html>');
  });
});
