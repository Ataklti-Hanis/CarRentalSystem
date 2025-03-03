import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car-dto';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}
  @Post()
  addCar(@Body() carDto: CreateCarDto) {
    return this.carService.addNewCar(carDto);
  }
  @Get()
  findAllCars() {
    return this.carService.findAllCars();
  }
  @Get(':id')
  findCar(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return 'this action returns a single car';
  }

  @Get(':id/availability')
  checkAvailability() {
    return 'this action returns availability of a car';
  }
}
