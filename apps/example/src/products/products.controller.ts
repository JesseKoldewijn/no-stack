import { Controller, Get, HttpStatus, Param, Res, Inject } from '@nestjs/common';
import { Response } from 'express';

import { NOST_ISR_CACHE, type IsrCache } from '@nost/framework';

import { PageRendererService } from '../ssr/page-renderer.service';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  private readonly CACHE_TTL_MS = 60 * 1000; // 60s MVP TTL
  constructor(
    private readonly productsService: ProductsService,
    private readonly pageRenderer: PageRendererService,
    @Inject(NOST_ISR_CACHE) private readonly isrCache: IsrCache,
  ) {}

  @Get(':id')
  async renderProduct(@Param('id') id: string, @Res() res: Response) {
    const cacheKey = `product-${id}`;
    const cachedItem = this.isrCache.get(cacheKey);

    // Cache hit (fresh)
    if (cachedItem && !this.isrCache.isStale(cachedItem.expiresAt)) {
      return res.status(HttpStatus.OK).type('text/html').send(cachedItem.html);
    }

    // Cache hit (stale-while-revalidate)
    if (cachedItem && this.isrCache.isStale(cachedItem.expiresAt)) {
      void this.revalidatePageInBackground(id, cacheKey);
      return res.status(HttpStatus.OK).type('text/html').send(cachedItem.html);
    }

    // Cache miss: render on-demand
    const html = await this.renderProductHtml(id);
    this.isrCache.set(cacheKey, html, this.CACHE_TTL_MS);

    return res.status(HttpStatus.OK).type('text/html').send(html);
  }

  // Client-side hydration fallback endpoint.
  @Get('api/:id')
  async getProductJson(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  private async renderProductHtml(id: string): Promise<string> {
    return this.pageRenderer.renderUrl(`/products/${id}`, `Product ${id}`, {
      productsService: this.productsService,
    });
  }

  private async revalidatePageInBackground(id: string, cacheKey: string) {
    try {
      const html = await this.renderProductHtml(id);
      this.isrCache.set(cacheKey, html, this.CACHE_TTL_MS);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`ISR background compilation failed for ${cacheKey}:`, err);
    }
  }
}
