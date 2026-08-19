import 'reflect-metadata';

import { Test } from '@nestjs/testing';
import { describe, expect, it } from 'vitest';

import { DocumentApp } from './test/fixtures/DocumentApp.tsrx';
import { NOST_ISR_CACHE, NostModule, OctaneRendererService } from './nost.module';
import type { IsrCache } from './isr/isr-cache';

describe('NostModule', () => {
  it('provides OctaneRendererService and NOST_ISR_CACHE', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [NostModule],
    }).compile();

    const renderer = moduleRef.get(OctaneRendererService);
    const cache = moduleRef.get<IsrCache>(NOST_ISR_CACHE);

    expect(renderer).toBeInstanceOf(OctaneRendererService);
    expect(cache.get('missing')).toBeUndefined();
  });

  it('renders Octane components through injected OctaneRendererService', async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [NostModule],
    }).compile();

    const renderer = moduleRef.get(OctaneRendererService);
    const html = await renderer.renderToHtml(DocumentApp, { message: 'DI render' });

    expect(html).toContain('<html><head>');
    expect(html).toContain('DI render');
  });
});
