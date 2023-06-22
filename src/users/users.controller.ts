import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('Users')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiInternalServerErrorResponse({ description: 'Server error' })
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Returns all users' })
  findAll(@GetUser() user: User): Promise<User[]> {
    this.logger.verbose(`User #${user.id} is getting users`);

    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiOkResponse({ description: 'Returns the requested user' })
  @ApiNotFoundResponse({ description: 'Requested user not found' })
  findById(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }
}
