import { ApiProperty } from '@nestjs/swagger';

import { IsMobilePhone, IsString } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty({
    example: '+79969591162',
    description: 'Телефон',
  })
  @IsMobilePhone('ru-RU', {}, { message: 'Не верный номер телефона' })
  readonly phone: string;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly firstName: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly lastName: string;
}
