import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@ApiTags('Authentication')
@ApiInternalServerErrorResponse({ description: 'Server error' })
@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiOkResponse({ description: 'Return authenticated user access token' })
  @ApiBadRequestResponse({ description: 'Body is not allowed' })
  @ApiNotFoundResponse({
    description: 'User with entered e-mail is not registered',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid password' })
  login(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(
      `Authenticating user with following credentials = ${JSON.stringify(
        loginUserDto,
      )}`,
    );

    return this.authService.login(loginUserDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({ description: 'Return registered user access token' })
  @ApiConflictResponse({ description: 'E-mail is already in use' })
  @ApiBadRequestResponse({ description: 'Body is not allowed' })
  register(
    @Body(ValidationPipe) registerUserDto: RegisterUserDto,
  ): Promise<{ accessToken: string }> {
    this.logger.verbose(
      `Registering a new user with following credentials = ${JSON.stringify(
        registerUserDto,
      )}`,
    );

    return this.authService.register(registerUserDto);
  }
}
