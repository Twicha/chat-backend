import { ApiProperty } from '@nestjs/swagger';

import { IsMobilePhone, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: '+79969591162',
    description: 'Телефон',
  })
  @IsMobilePhone('ru-RU', {}, { message: 'Не верный номер телефона' })
  readonly phone: string;

  @ApiProperty({
    example: '12345678',
    description: 'Пароль',
  })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;
}
