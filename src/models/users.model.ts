import { ApiProperty } from '@nestjs/swagger';

import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  color: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({
    example: '64cdb981-accb-42ab-a866-2a39c95b2785',
    description: 'Уникальный идентификатор пользователя',
  })
  @Column({
    type: DataType.UUID,
    unique: true,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({
    example: '+79969591162',
    description: 'Номер телефона',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({
    example: '12345678',
    description: 'Пароль',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 'some-image.jpg',
    description: 'Аватар пользователя',
  })
  @Column({
    type: DataType.STRING,
  })
  avatar: string;

  @ApiProperty({
    example: 'green',
    description: 'Цвет пользователя',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @ApiProperty({
    example: [
      '75442486-0878-440c-9db1-a7006c25a39f',
      '75442486-0878-440c-9db1-a7006c25a39f',
    ],
    description: 'Контакты',
  })
  @Column({
    type: DataType.ARRAY(DataType.UUID),
    defaultValue: [],
  })
  contacts: string[];
}
