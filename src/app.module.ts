import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    AuthModule,
    NotificationsModule,
    DatabaseModule,
    UsersModule,
  ],
})
export class AppModule {}
