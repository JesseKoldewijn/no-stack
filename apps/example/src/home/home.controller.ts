import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

import { PageRendererService } from '../ssr/page-renderer.service';

@Controller()
export class HomeController {
  constructor(private readonly pageRenderer: PageRendererService) {}

  @Get('/')
  async renderHome(@Res() res: Response) {
    const html = await this.pageRenderer.renderUrl('/');

    return res.status(HttpStatus.OK).type('text/html').send(html);
  }
}
