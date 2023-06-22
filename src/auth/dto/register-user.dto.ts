import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    description: 'User name',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'User father last name',
    type: String,
  })
  fatherLastName: string;

  @ApiProperty({
    description: 'User mother last name',
    type: String,
  })
  motherLastName: string;

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
