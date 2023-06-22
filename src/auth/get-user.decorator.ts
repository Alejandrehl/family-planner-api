import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/user.entity';

export const GetUser = createParamDecorator(
  async (_, ctx: ExecutionContext): Promise<User> => {
    const req = ctx.switchToHttp().getRequest();
    const user: User = req.user;

    return user;
  },
);
