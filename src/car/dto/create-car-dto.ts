import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
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
  readonly year: number;

  @IsBoolean()
  readonly availability: boolean;

  @IsNotEmpty()
  @IsNumber()
  readonly pricePerDay: number;

  @IsEnum(carStatus)
  readonly status: carStatus;
}
