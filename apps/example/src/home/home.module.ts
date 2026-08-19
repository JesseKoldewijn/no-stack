import { Module } from '@nestjs/common';

import { HomeController } from './home.controller';
import { NostModule } from '@nost/framework';

@Module({
  imports: [NostModule],
  controllers: [HomeController],
})
export class HomeModule {}

