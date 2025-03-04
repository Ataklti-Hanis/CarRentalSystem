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
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async create(userDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.email = userDto.email;
    user.password = userDto.password;
    user.phone = userDto.phone ?? '';
    user.role = userDto.role ?? Role.CUSTOMER;
    user.apiKey = uuid4();

    const salt = await bcrypt.genSalt();
    userDto.password = await bcrypt.hash(userDto.password, salt);
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
}
