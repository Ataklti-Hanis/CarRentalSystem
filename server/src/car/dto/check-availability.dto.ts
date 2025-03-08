import { IsDateString, IsNotEmpty } from 'class-validator';

export class checkAvailabilityDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
}
