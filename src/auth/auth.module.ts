import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { MailService } from 'src/helper/mail.service';
import { HelperModule } from 'src/helper/helper.module';
import { OtpService } from 'src/helper/otp.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/auth/common/strategies';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/role.guard';



@Module({
  imports: [
    HelperModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    PrismaService,
    MailService, 
    OtpService, 
    JwtService,
    AccessTokenStrategy
  ],
})
export class AuthModule { } 
