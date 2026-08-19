import { Module } from '@nestjs/common';

import { NostModule } from '@nost/framework';

import { PageRendererService } from './page-renderer.service';

@Module({
  imports: [NostModule],
  providers: [PageRendererService],
  exports: [PageRendererService],
})
export class SsrModule {}
