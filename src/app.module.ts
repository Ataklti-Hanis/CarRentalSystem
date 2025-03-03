import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CarModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
