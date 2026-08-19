import { Module } from '@nestjs/common';

import { NostModule } from '@nost/framework';

import { SsrModule } from '../ssr/ssr.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [NostModule, SsrModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
