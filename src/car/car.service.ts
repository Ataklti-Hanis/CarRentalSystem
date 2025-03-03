import { Injectable } from '@nestjs/common';

@Injectable()
export class CarService {
  cars: string[] = [];
  addNewCar(car) {
    this.cars.push(car);
    return this.cars;
  }
  findAllCars() {
    return this.cars;
  }
}
