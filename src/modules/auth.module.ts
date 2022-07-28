import { forwardRef, Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AuthController } from 'src/controllers';

import { AuthService } from 'src/services';

import { UsersModule } from './users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
