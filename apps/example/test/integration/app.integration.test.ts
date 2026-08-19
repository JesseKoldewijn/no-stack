import 'reflect-metadata';

import { existsSync, readdirSync } from 'fs';
import { Test } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { NostModule } from '@nost/framework';

import { resolveClientAssetsPath } from '../../src/app.module';
import { HomeModule } from '../../src/home/home.module';
import { ProductsModule } from '../../src/products/products.module';
import { SsrModule } from '../../src/ssr/ssr.module';

describe('Example app integration', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const assetsPath = resolveClientAssetsPath();
    expect(existsSync(assetsPath)).toBe(true);
    expect(readdirSync(assetsPath)).toContain('hydrate.css');

    const moduleRef = await Test.createTestingModule({
      imports: [NostModule, SsrModule, HomeModule, ProductsModule],
    }).compile();

    app = moduleRef.createNestApplication<NestExpressApplication>();
    app.useStaticAssets(assetsPath, { prefix: '/assets' });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET / returns SSR home HTML with stylesheet in head', async () => {
    const response = await request(app.getHttpServer()).get('/').expect(200);

    expect(response.headers['content-type']).toMatch(/text\/html/);
    expect(response.text).toContain('<html><head>');
    expect(response.text).toContain('NOST Stack');
    expect(response.text).toContain('/assets/hydrate.css');
    expect(response.text).toContain('Nest-first engine for Octane SSR');
  });

  it('GET /products/1 returns SSR product HTML', async () => {
    const response = await request(app.getHttpServer()).get('/products/1').expect(200);

    expect(response.headers['content-type']).toMatch(/text\/html/);
    expect(response.text).toContain('<html><head>');
    expect(response.text).toContain('Product 1');
    expect(response.text).toContain('/assets/hydrate.css');
  });

  it('GET /products/api/1 returns product JSON', async () => {
    const response = await request(app.getHttpServer()).get('/products/api/1').expect(200);

    expect(response.body).toEqual({
      id: '1',
      name: 'Product 1',
      price: 202,
    });
  });

  it('serves compiled client assets', async () => {
    const css = await request(app.getHttpServer()).get('/assets/hydrate.css').expect(200);
    expect(css.headers['content-type']).toMatch(/text\/css/);
    expect(css.text).toContain('min-h-screen');

    const js = await request(app.getHttpServer()).get('/assets/hydrate.js').expect(200);
    expect(js.headers['content-type']).toMatch(/javascript/);
  });

  it('serves cached product HTML on repeated requests', async () => {
    const first = await request(app.getHttpServer()).get('/products/2').expect(200);
    const second = await request(app.getHttpServer()).get('/products/2').expect(200);

    expect(first.text).toContain('Product 2');
    expect(second.text).toBe(first.text);
  });
});
