import { Module } from '@nestjs/common';

import { HomeController } from './home.controller';
import { SsrModule } from '../ssr/ssr.module';

@Module({
  imports: [SsrModule],
  controllers: [HomeController],
})
export class HomeModule {}
