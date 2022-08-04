import { ApiProperty } from '@nestjs/swagger';

export class DeleteContactDto {
  @ApiProperty({
    example: '64cdb981-accb-42ab-a866-2a39c95b2785',
    description: 'ID пользователя',
  })
  readonly userId: string;
}
