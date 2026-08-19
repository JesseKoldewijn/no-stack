import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

import { OctaneRendererService } from '@nost/framework';

import { HomeApp } from '../views/HomeApp.tsrx';

@Controller()
export class HomeController {
  constructor(private readonly octaneRenderer: OctaneRendererService) {}

  @Get('/')
  async renderHome(@Res() res: Response) {
    const html = await this.octaneRenderer.renderToHtml(HomeApp);

    return res.status(HttpStatus.OK).type('text/html').send(html);
  }
}

