import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { IncomingHttpHeaders } from 'http';

import { UpdateAccountDto } from 'src/dto';

import { User } from 'src/models';

import { UsersService } from './users.service';

@Injectable()
export class AccountService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getAccount(headers: IncomingHttpHeaders) {
    const { id } = this.getTokenData(headers);

    const user = await this.userService.getUserById(id);

    return user;
  }

  async updateAccount(userDto: UpdateAccountDto, headers: IncomingHttpHeaders) {
    const { id } = this.getTokenData(headers);

    const user = await this.userService.getUserById(id);

    Object.keys(userDto).forEach((key) => {
      user[key] = userDto[key];
    });

    await user.save().catch((e) => {
      const errors = e.errors.reduce((final, curr) => {
        final[curr.path] = curr.type;

        return final;
      }, {});

      throw new HttpException(errors, HttpStatus.CONFLICT);
    });

    return user;
  }

  private getTokenData(headers: IncomingHttpHeaders) {
    const authHeader = headers.authorization;

    const token = authHeader.split(' ')[1];

    return this.jwtService.verify<User>(token);
  }
}
