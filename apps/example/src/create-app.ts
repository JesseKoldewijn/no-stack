import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

import { AppModule } from './app.module';

let cachedApp: express.Express | undefined;

export async function createExpressApp(): Promise<express.Express> {
  if (!cachedApp) {
    const expressApp = express();
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    nestApp.enableShutdownHooks();
    await nestApp.init();
    cachedApp = expressApp;
  }

  return cachedApp;
}
