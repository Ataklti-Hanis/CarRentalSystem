import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car-dto';
import { diskStorage } from 'multer';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { Car } from './car.entity';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async addCar(
    @Body() carDto: CreateCarDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let image: string = '';
    if (file) {
      image = file.filename;
    }
    return this.carService.addNewCar(carDto, image);
  }
  @Get()
  findAllCars(): Promise<Car[]> {
    return this.carService.getAllCars();
  }

  @Get('search')
  searchCars(
    @Query('make') make: string,
    @Query('model') model: string,
    @Query('year') year: number,
    @Query('status') status: string,
    @Query('pricePerDay') pricePerDay: number,
  ): Promise<Car[]> {
    const filters = { make, model, year, status, pricePerDay };
    return this.carService.getCar(filters);
  }

  @Get(':id/availability')
  checkAvailability() {
    return 'this action returns availability of a car';
  }
}
