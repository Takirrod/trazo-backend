import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'
import { ApplicationModule } from './application/application.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ApplicationModule,
    ConfigModule.forRoot(),
    CoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
