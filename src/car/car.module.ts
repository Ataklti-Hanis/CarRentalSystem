import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AdminGuard } from 'src/auth/admin.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), AuthModule],
  controllers: [CarController],
  providers: [CarService, AdminGuard],
})
export class CarModule {}
