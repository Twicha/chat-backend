import { Body, Controller, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from 'src/dto';

import { AuthService } from 'src/services';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Post('/registration')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
