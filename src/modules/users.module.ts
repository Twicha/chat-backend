import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from 'src/controllers';

import { User } from 'src/models';

import { UsersService } from 'src/services';

import { AuthModule } from './auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
