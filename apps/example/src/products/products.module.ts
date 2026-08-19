import { Module } from '@nestjs/common';

import { NostModule } from '@nost/framework';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [NostModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

