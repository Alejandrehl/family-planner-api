import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.decode(token);

      const user = new User();
      user.id = payload['id'];
      user.name = payload['name'];
      user.fatherLastName = payload['fatherLastName'];
      user.motherLastName = payload['motherLastName'];
      user.email = payload['email'];
      user.phone = payload['phone'];
      user.role = payload['role'];
      user.createdAt = payload['createdAt'];
      user.updatedAt = payload['updatedAt'];
      user.deletedAt = payload['deletedAt'];

      request.user = user;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
