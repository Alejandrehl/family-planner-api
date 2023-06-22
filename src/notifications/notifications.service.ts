import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { validate } from 'class-validator';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('NOTIFICATION_REPOSITORY')
    private notificationRepository: Repository<Notification>,
  ) {}

  async findAll(): Promise<Notification[]> {
    return await this.notificationRepository
      .createQueryBuilder('notification')
      .orderBy('notification.createdAt', 'DESC')
      .getMany();
  }

  async findById(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOneBy({ id });

    if (!notification) {
      throw new NotFoundException();
    }

    return notification;
  }

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    const notification = this.notificationRepository.create(
      createNotificationDto,
    );

    const errors = await validate(notification);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return await this.notificationRepository.save(notification);
  }

  async remove(id: number): Promise<void> {
    const notification = await this.notificationRepository.findOneBy({ id });

    if (!notification) {
      throw new NotFoundException();
    }

    await this.notificationRepository.remove(notification);
  }
}
