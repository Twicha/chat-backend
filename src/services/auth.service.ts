import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from 'src/dto';

import { User } from 'src/models';

import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByPhone(userDto.phone);

    if (candidate) {
      throw new HttpException(
        'Пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken({ phone, id, avatar, contacts }: User) {
    const payload = { phone, id, avatar, contacts };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser({ phone, password }: CreateUserDto) {
    const user = await this.userService.getUserByPhone(phone);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Некорректрый номер телефона или пароль',
      });
    }

    const passwordEqual = await bcrypt.compare(password, user.password);

    if (user && passwordEqual) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректрый номер телефона или пароль',
    });
  }
}
