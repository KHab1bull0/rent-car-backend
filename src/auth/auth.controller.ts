import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, UseFilters, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.config';
import { join } from 'path';
import { Public } from 'src/auth/common/decorators';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from 'src/auth/common/guards';
import { Roles } from './common/decorators/role.decorator';
import { Role } from './common/types/role.enum';
import { RolesGuard } from './common/guards/role.guard';
import { OtpDto } from './dto/otpDto';



@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }
  @Public()
  @Post('signup')
  @UseInterceptors(FileInterceptor('avatar', { storage: multerOptions.storage }))
  async signup(@UploadedFile() file: Express.Multer.File, @Body() createAuthDto: SignUpDto) {

    if (!file) {
      throw new Error('Fayl yuborilmadi');
    }

    const newuser = {
      ...createAuthDto,
      avatarUrl: file.filename
    }

    return await this.authService.create(newuser);
  }

  @Public()
  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.login(signinDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("getme")
  getme(@Req() req) {
    const { email } = req.user

    return this.authService.getProfile(email);
  }

  @Post("verify")
  verify(@Body() otpDto: OtpDto) {
    return this.authService.verify(otpDto);
  }
}
