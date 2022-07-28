import { forwardRef, Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AccountController } from 'src/controllers';

import { AccountService } from 'src/services';

import { UsersModule } from './users.module';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  exports: [AccountService, JwtModule],
})
export class AccountModule {}
