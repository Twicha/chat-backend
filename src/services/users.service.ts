import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';

import { AddContactDto, CreateUserDto } from 'src/dto';

import { User } from 'src/models';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();

    return users;
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
