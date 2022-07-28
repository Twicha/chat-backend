import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { AddContactDto, CreateUserDto } from 'src/dto';

import { User } from 'src/models';

const colorItems = ['red', 'orange', 'violet', 'green', 'cyan', 'blue', 'pink'];

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const color = colorItems[Math.floor(Math.random() * colorItems.length)];

    const user = await this.userRepository.create({ ...dto, color });

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      attributes: {
        exclude: ['password'],
      },
    });

    return users;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });

    return user;
  }

  async getUserByPhone(phone: string) {
    const user = await this.userRepository.findOne({ where: { phone } });

    return user;
  }

  async addContact(id: string, { userId }: AddContactDto) {
    const user = await this.userRepository.findByPk(id);

    const hasContact: boolean = user.contacts.includes(userId);

    if (hasContact) {
      throw new HttpException(
        'Данный контакт уже добавлен',
        HttpStatus.CONFLICT,
      );
    }

    user.set('contacts', [...user.contacts, userId]);

    await user.save();

    return user;
  }
}
