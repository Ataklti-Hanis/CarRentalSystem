import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  signup(@Body() userDto: CreateUserDto): Promise<User> {
    return this.usersService.create(userDto);
  }
  @Post('signin')
  signin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(@Req() req) {
    delete req.user.password;
    return {
      msg: 'Authenticated with ApiKey',
      user: req.user,
    };
  }
}
