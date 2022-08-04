import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { InjectModel } from '@nestjs/sequelize';

import { IncomingHttpHeaders } from 'http';

import { FindAttributeOptions, Op, WhereOptions } from 'sequelize';

import { CreateUserDto } from 'src/dto';

import { User } from 'src/models';

const colorItems = ['red', 'orange', 'violet', 'green', 'cyan', 'blue', 'pink'];

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const color = colorItems[Math.floor(Math.random() * colorItems.length)];

    const user = await this.userRepository.create({ ...dto, color });

    return user;
  }

  async getAllUsers(query: any, headers?: IncomingHttpHeaders) {
    const tokenUser = this.getTokenData(headers);

    const { phone, ids } = query;

    const attributes: FindAttributeOptions = {
      exclude: ['password'],
    };

    const where: WhereOptions<User> = {};

    if (tokenUser) {
      where.id = {
        [Op.not]: tokenUser.id,
      };

      attributes.exclude = [...attributes.exclude, 'contacts'];
    }

    if (phone) {
      where.phone = {
        [Op.substring]: phone,
      };
    }

    if (ids) {
      where.id = ids.split(',');
    }

    const users = await this.userRepository.findAll({
      where,
      attributes,
    });

    return users;
  }

  async getUserById(id: string, headers?: IncomingHttpHeaders) {
    const tokenUser = this.getTokenData(headers);

    const attributes: FindAttributeOptions = {
      exclude: ['password'],
    };

    if (tokenUser) {
      attributes.exclude = [...attributes.exclude, 'contacts'];
    }

    const user = await this.userRepository.findByPk(id, {
      attributes,
    });

    return user;
  }

  async getUserByPhone(phone: string) {
    const user = await this.userRepository.findOne({ where: { phone } });

    return user;
  }

  private getTokenData(headers?: IncomingHttpHeaders) {
    if (!headers) {
      return;
    }

    const authHeader = headers.authorization;

    const token = authHeader.split(' ')[1];

    return this.jwtService.verify<User>(token);
  }
}
