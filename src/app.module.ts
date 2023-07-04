import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module'
import { CommentModule } from './modules/comment/comment.module'
import { UserModule } from './modules/user/user.module'
import { ImageModule } from './modules/image/image.module'
import { StoreImageModule } from './modules/store-image/store-image.module'

@Module({
  imports: [
    AuthModule,
    CommentModule,
    UserModule,
    ImageModule,
    StoreImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
