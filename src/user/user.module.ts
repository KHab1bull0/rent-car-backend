import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { HashService } from 'src/helper/hash.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, HashService],
})
export class UserModule { }
