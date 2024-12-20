import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', 
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
  exports: [JwtModule] 

})
export class AuthModule {}

