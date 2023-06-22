import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { notificationProviders } from './notification.providers';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [NotificationsController],
  providers: [...notificationProviders, NotificationsService],
})
export class NotificationsModule {}
