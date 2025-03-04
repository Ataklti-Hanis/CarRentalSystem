import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.usersService.findOne(loginDto);

    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (passwordMatched) {
      return plainToInstance(User, user);
    } else {
      throw new UnauthorizedException('password does not match');
    }
  }
}
