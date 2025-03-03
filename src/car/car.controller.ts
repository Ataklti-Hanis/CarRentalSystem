import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CarService } from './car.service';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}
  @Post()
  addCar() {
    return this.carService.addNewCar('Toyota, Byd, Hyundai');
  }
  @Get()
  findAllCars() {
    return this.carService.findAllCars();
  }
  @Get(':id')
  findCar(id: number) {
    return 'This action returns a #${id} car';
  }

  @Get(':id')
  checkAvailability(id: number) {
    return 'this action returns availability of a car';
  }
  @Put(':id')
  updateCar(id: number) {
    return 'This action updates a #${id} car';
  }

  @Delete(':id')
  deleteCar(id: number) {
    return 'This action removes a #${id} car';
  }
}
