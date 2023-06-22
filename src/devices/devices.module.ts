import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { deviceProviders } from './device.providers';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
  ],
  controllers: [DevicesController],
  providers: [...deviceProviders, DevicesService],
})
export class DevicesModule {}
