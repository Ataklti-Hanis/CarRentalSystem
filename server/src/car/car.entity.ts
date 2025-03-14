import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column({ type: 'boolean', default: true })
  availability: boolean;

  @Column()
  pricePerDay: number;

  @Column({
    type: 'enum',
    enum: ['AVAILABLE', 'RENTED', 'UNDER_MAINTENANCE'],
    default: 'AVAILABLE',
  })
  status: string;

  @Column({ nullable: true })
  image: string;
}
