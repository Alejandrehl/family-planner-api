import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'The title of a notification',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'The body of a notification',
    type: String,
  })
  body: string;
}
