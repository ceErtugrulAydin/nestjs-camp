import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { UserModule } from 'src/user/user.module';
import environment from 'tools/environment/environment';

@Module({
  imports: [
    UserModule,
    LibsModule,
    MongooseModule.forRoot(environment.mongoURL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class LibsModule {}