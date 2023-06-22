import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { Notification } from './notification.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.entity';

@ApiBearerAuth()
@ApiTags('Notifications')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiInternalServerErrorResponse({ description: 'Server error' })
@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
  private logger = new Logger('NotificationsController');

  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiOkResponse({ description: 'Returns all notifications' })
  findAll(@GetUser() user: User): Promise<Notification[]> {
    this.logger.verbose(`User #${user.id} is getting notifications`);

    return this.notificationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiOkResponse({ description: 'Returns the requested notification' })
  @ApiNotFoundResponse({ description: 'Requested notification not found' })
  findById(@Param('id') id: number): Promise<Notification> {
    return this.notificationsService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new notification' })
  @ApiCreatedResponse({ description: 'Return created notification' })
  @ApiBadRequestResponse({ description: 'Body is not allowed' })
  create(
    @Body(ValidationPipe) createNotificationDto: CreateNotificationDto,
  ): Promise<Notification> {
    return this.notificationsService.create(createNotificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete notification by id' })
  @ApiOkResponse({ description: 'Returns void' })
  delete(@Param('id') id: number): Promise<void> {
    return this.notificationsService.remove(id);
  }
}
