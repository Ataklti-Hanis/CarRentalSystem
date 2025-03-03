import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum carStatus {
  AVAILABLE = 'AVAILABLE',
  RENTED = 'RENTED',
  UNDER_MAINTENANCE = 'UNDER_MAINTENANCE',
}
export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  readonly make: string;

  @IsNotEmpty()
  @IsString()
  readonly model: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly year: number;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
  })
  readonly availability: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  readonly pricePerDay: number;

  @IsEnum(carStatus)
  readonly status: carStatus;

  @IsOptional()
  image: string;
}
