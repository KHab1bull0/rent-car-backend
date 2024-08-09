import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { HelperModule } from './helper/helper.module';
import { AccessTokenStrategy } from './auth/common/strategies';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RolesGuard } from './auth/common/guards/role.guard';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), 
      serveRoot: '/static', 
    }),

    JwtModule.register({
      global: true,
    }),

    AuthModule,
    UserModule,
    AuthModule,
    HelperModule,
  ],

  controllers: [],
  providers: [
    PrismaService,
  ],
})

export class AppModule { }


