import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'User name',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'User last name',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    description: 'User email',
    type: String,
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
  })
  password: string;

  @ApiProperty({
    description: 'Confirm password field',
    type: String,
  })
  confirmPassword: string;
}
