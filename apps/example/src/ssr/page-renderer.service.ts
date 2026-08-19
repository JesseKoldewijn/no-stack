import { Injectable } from '@nestjs/common';

import { OctaneRendererService } from '@nost/framework';

import { createAppRouter, type AppRouterContext } from '../router/create-app-router';
import { AppDocument } from '../views/AppDocument.tsrx';

@Injectable()
export class PageRendererService {
  constructor(private readonly octaneRenderer: OctaneRendererService) {}

  async renderUrl(
    url: string,
    title = 'NOST Stack',
    context: AppRouterContext = {},
  ): Promise<string> {
    const router = createAppRouter(url, context);
    await router.load();

    return this.octaneRenderer.renderToHtml(AppDocument, {
      router,
      title,
    });
  }
}
