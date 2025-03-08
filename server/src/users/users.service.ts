import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from 'src/auth/dto/login.dto';
import { v4 as uuid4 } from 'uuid';
import { Role } from './role.enum';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.phone = userDto.phone ?? '';
    user.role = userDto.role ?? Role.CUSTOMER;
    user.apiKey = uuid4();

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(userDto.password, salt);
    const savedUser = await this.userRepo.save(user);
    return plainToInstance(User, savedUser);
  }

  async findOne(data: LoginDto): Promise<User> {
    const user = await this.userRepo.findOneBy({ email: data.email });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findOneByApiKey(apiKey: string): Promise<User | null> {
    return this.userRepo.findOneBy({ apiKey });
  }

  async updateProfile(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    // Only update the fields that are provided in the DTO
    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }

    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }

    // Email should not be changed if the new email is the same or it already exists in the system
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepo.findOneBy({
        email: updateUserDto.email,
      });
      if (existingUser) {
        updateUserDto.email = user.email;
      } else {
        // If the email is valid and not existing, update it
        user.email = updateUserDto.email;
      }
    }

    if (updateUserDto.phone) {
      user.phone = updateUserDto.phone;
    }

    if (updateUserDto.role) {
      user.role = updateUserDto.role;
    }

    return this.userRepo.save(user);
  }
}
