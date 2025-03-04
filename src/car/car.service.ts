import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car-dto';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import * as path from 'path';
import { UpdateCarDto } from './dto/update-car-dto';
import { unlink } from 'fs';
import { promisify } from 'util';
import { promises as fs } from 'fs';
const unlinkAsync = promisify(unlink);
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

  async deleteCar(id: string): Promise<DeleteResult> {
    const car = await this.carRepo.findOneBy({ id });
    if (!car) {
      throw new Error('Car not found');
    }
    if (car.image) {
      const imagePath = path.join(__dirname, '../../uploads', car.image);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.log('Error deleting image:', error);
      }
    }
    return await this.carRepo.delete(id);
  }

  async update(
    id: string,
    recordDto: UpdateCarDto,
    file?: Express.Multer.File,
  ): Promise<UpdateResult> {
    const updatedFields: Record<string, any> = Object.keys(recordDto).reduce(
      (acc, key) => {
        if (recordDto[key] !== undefined && recordDto[key] !== null) {
          acc[key] = recordDto[key];
        }
        return acc;
      },
      {},
    );

    // Find the car record from the database to get the old image name
    const car = await this.carRepo.findOneBy({ id });

    if (!car) {
      throw new Error('Car not found');
    }

    // Handle image upload with Multer
    if (file) {
      // Define upload folder
      const uploadPath = path.join(__dirname, '../../uploads');

      // Generate unique filename
      const newFileName = `${Date.now()}-${file.originalname}`;
      const filePath = path.join(uploadPath, newFileName);

      try {
        // Write file to uploads folder
        await fs.writeFile(filePath, file.buffer);

        // Delete the old image if it exists
        if (car.image) {
          const oldImagePath = path.join(uploadPath, car.image);
          try {
            await fs.unlink(oldImagePath);
          } catch (error) {
            console.error(`Error deleting old image: ${error}`);
          }
        }

        // Update database with new filename
        updatedFields.image = newFileName;
      } catch (fileSaveError) {
        console.error('Error saving new image:', fileSaveError);
      }
    }

    // Update the car record in the database
    const updateResult = await this.carRepo.update(id, updatedFields);
    console.log('Update result:', updateResult);

    return updateResult;
  }
}
