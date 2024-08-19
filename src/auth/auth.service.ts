import { BadGatewayException, BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { PrismaService } from 'src/prisma.service';
import { MailService } from 'src/helper/mail.service';
import { OtpService } from 'src/helper/otp.service';
import { HashService } from 'src/helper/hash.service';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import { OtpDto } from './dto/otpDto';
import { SignUpDto2 } from './dto/signup.dto2';


@Injectable()
export class AuthService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
    private readonly otp: OtpService,
    private readonly hash: HashService,
    private readonly jwtservice: JwtService

  ) { }

  async create(createAuthDto: SignUpDto) {
    try {

      const { fullname, email, password } = createAuthDto;
      const users = await this.prisma.users.findMany();
      const user = await this.prisma.users.findFirst({ where: { email: email } });

      if (user) {
        return new HttpException("User already exists", HttpStatus.BAD_REQUEST);
      }

      createAuthDto.password = await this.hash.hashPassword(createAuthDto.password);

      const newUser = await this.prisma.users.create({
        data: createAuthDto
      });

      const number = this.otp.generateOtp(6)
      const otp = await this.prisma.otps.create({
        data: { email: email, otp: number }
      });

      this.mail.sendMail(email, 'Token', number)

      return {
        sendOtp: true,
        newUser: newUser
      }

    } catch (error) {
      console.log(error);
      return { error: error }
    }
  }


  async create2(createAuthDto: SignUpDto2) {
    try {

      const { email } = createAuthDto;
      const users = await this.prisma.users.findMany();
      const user = await this.prisma.users.findFirst({ where: { email: email } });

      if (user) {
        return new HttpException("User already exists", HttpStatus.BAD_REQUEST);
      }

      createAuthDto.password = await this.hash.hashPassword(createAuthDto.password);

      const newUser = await this.prisma.users2.create({
        data: createAuthDto
      });

      const number = this.otp.generateOtp(6)
      const otp = await this.prisma.otps.create({
        data: { email: email, otp: number }
      });

      this.mail.sendMail(email, 'Otp', number)

      return {
        sendOtp: true,
        newUser: newUser
      }

    } catch (error) {
      console.log(error);
      return { error: error }
    }
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.users.findFirst({ where: { email: email } });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    if (user && (await this.hash.comparePasswords(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(signinDto: SigninDto) {

    const validUser = await this.validateUser(signinDto.email, signinDto.password);

    const payload = { email: validUser.email, role: validUser.role };

    const access = this.jwtservice.sign(payload, { secret: process.env.ACCESS_KEY, expiresIn: process.env.ACCESS_EXPIRE_TIME })
    const refresh = this.jwtservice.sign(payload, { secret: process.env.REFRESH_KEY, expiresIn: process.env.REFRESH_EXPIRE_TIME })

    this.refreshTokenFunc(refresh, validUser);

    return {
      accessToken: access,
      refreshToken: refresh
    }

  }


  async refreshTokenFunc(refreshToken: string, validUser) {
    const dbrefresh = await this.prisma.refreshTokens.findFirst({
      where: { userId: validUser.id },
    });

    if (dbrefresh) {
      const updateRefresh = await this.prisma.refreshTokens.update({
        data: { token: refreshToken },
        where: { userId: validUser.id }
      });
    } else {
      const newRefresh = await this.prisma.refreshTokens.create({
        data: { userId: validUser.id, token: refreshToken }
      });
    }
  }

  async getProfile(email: string) {
    try {
      return await this.prisma.users.findFirst({ where: { email: email } });
    } catch (e) {
      console.log(e);
      return { error: e }
    }
  }

  async verify(otpDto: OtpDto) {
    try {
      const otp = await this.prisma.otps.findFirst({ where: { email: otpDto.email } });


      if (otp.otp === otpDto.otp) {
        const user = await this.prisma.users.findFirst({ where: { email: otp.email } })
        await this.prisma.otps.delete({ where: { id: otp.id } });
        await this.prisma.users.update({
          data: { status: "active" },
          where: { id: user.id }
        });

        return { message: "Verifyed" }
      }

      throw new BadRequestException("Invalid Otp")

    } catch (error) {
      throw new HttpException("Invalid otp", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

