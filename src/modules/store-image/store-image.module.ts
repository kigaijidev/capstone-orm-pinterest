import { Module } from '@nestjs/common';
import { StoreImageController } from './store-image.controller';
import { StoreImageService } from './store-image.service';

@Module({
  controllers: [StoreImageController],
  providers: [StoreImageService]
})
export class StoreImageModule {}
