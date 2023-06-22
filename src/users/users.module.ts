import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
})
export class UsersModule {}
