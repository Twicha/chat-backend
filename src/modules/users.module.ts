import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from 'src/controllers';

import { User } from 'src/models';

import { UsersService } from 'src/services';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
