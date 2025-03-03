import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car-dto';
import { Like, Repository } from 'typeorm';

@Injectable()
export class CarService {
  constructor(@InjectRepository(Car) private carRepo: Repository<Car>) {}
  addNewCar(carDto: CreateCarDto, image: string): Promise<Car> {
    const car = new Car();
    car.make = carDto.make;
    car.model = carDto.model;
    car.year = carDto.year;
    car.pricePerDay = carDto.pricePerDay;
    car.availability = carDto.availability;
    car.status = carDto.status;
    car.image = image;

    return this.carRepo.save(car);
  }
  getAllCars(): Promise<Car[]> {
    return this.carRepo.find();
  }
  getCar(filters: {
    make?: string;
    model?: string;
    year?: number;
    status?: string;
    pricePerDay?: number;
  }): Promise<Car[]> {
    const query: any = {};
    if (filters.make) {
      query.make = Like(`%${filters.make}%`);
    }
    if (filters.model) {
      query.model = Like(`%${filters.model}%`);
    }
    if (filters.year) query.year = filters.year;
    if (filters.status) query.status = filters.status;
    if (filters.pricePerDay) query.pricePerDay = filters.pricePerDay;

    return this.carRepo.find({ where: query });
  }
}
