import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
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
}
