import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AddContactDto, CreateUserDto } from 'src/dto';

import { User } from 'src/models';

import { UsersService } from 'src/services';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() dto: CreateUserDto) {
    console.log(dto);
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получение пользователя по ID' })
  @ApiResponse({ status: 200, type: User })
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Добавление контакта' })
  @ApiResponse({ status: 200, type: User })
  @Post('/:id/contacts')
  addContact(@Param('id') id: string, @Body() dto: AddContactDto) {
    return this.usersService.addContact(id, dto);
  }
}
