import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    // ✅ Ensure Authorization Header Exists
    if (!request.headers.authorization) {
      throw new ForbiddenException('No Authorization header');
    }

    const token = request.headers.authorization.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Invalid token format');
    }

    let user;
    try {
      user = this.jwtService.verify(token);
    } catch (err) {
      throw new ForbiddenException('Invalid token');
    }

    if (user.role !== 'admin') {
      throw new ForbiddenException('Access Denied');
    }
    return true;
  }
}
