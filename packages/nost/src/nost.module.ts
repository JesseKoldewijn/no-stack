import { Module } from '@nestjs/common';

import { InMemoryIsrCache, type IsrCache } from './isr/isr-cache';
import { renderOctaneToHtml } from './renderer/octane-renderer';

export const NOST_ISR_CACHE = Symbol('NOST_ISR_CACHE');

export class OctaneRendererService {
  renderToHtml(component: unknown, props?: unknown): Promise<string> {
    return renderOctaneToHtml(component, props);
  }
}

@Module({
  providers: [
    OctaneRendererService,
    {
      provide: NOST_ISR_CACHE,
      useFactory: (): IsrCache => new InMemoryIsrCache(),
    },
  ],
  exports: [OctaneRendererService, NOST_ISR_CACHE],
})
export class NostModule {}

