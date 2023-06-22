import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import configuration from 'src/config/configuration';
import { userProviders } from 'src/users/user.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: configuration.jwtSecret,
      signOptions: {
        expiresIn: configuration.jwtExpiresIn,
      },
    }),
    DatabaseModule,
  ],
  exports: [PassportModule],
  providers: [...userProviders, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
