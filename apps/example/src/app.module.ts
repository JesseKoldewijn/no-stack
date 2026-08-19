import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

import { NostModule } from '@nost/framework';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';

function moduleDirectory(): string {
  if (typeof __dirname !== 'undefined') {
    return __dirname;
  }

  return fileURLToPath(new URL('.', import.meta.url));
}

export function resolveClientAssetsPath(): string {
  const currentDir = moduleDirectory();
  const candidates = [
    join(currentDir, 'client', 'assets'),
    join(currentDir, '..', 'dist', 'client', 'assets'),
    join(process.cwd(), 'dist', 'client', 'assets'),
    join(process.cwd(), 'apps', 'example', 'dist', 'client', 'assets'),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return candidates[0]!;
}

@Module({
  imports: [
    NostModule,
    ServeStaticModule.forRoot({
      rootPath: resolveClientAssetsPath(),
      serveRoot: '/assets',
      exclude: ['/api*'],
    }),
    HomeModule,
    ProductsModule,
  ],
})
export class AppModule {}

