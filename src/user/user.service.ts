import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/updateDto';
import { PrismaService } from 'src/prisma.service';
import { HashService } from 'src/helper/hash.service';

@Injectable()
export class UserService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService
  ) { }


  async findAll() {
    try {
      return await this.prisma.users.findMany();
    } catch (e) {
      return { message: "Internal server error", error: e }
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.users.findFirst({ where: { id: id } });

      if (!user) {
        throw new NotFoundException("User not found");
      }
      return user

    } catch (e) {
      return { message: "Internal server error", error: e }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.users.findFirst({ where: { id: id } });


      if (!user) {
        return {
          status: 400,
          message: "User not found"
        }
      }

      if (updateUserDto.password) {
        updateUserDto.password = await this.hash.hashPassword(updateUserDto.password);
      }

      const updatedUser = {
        password: updateUserDto.password ?? user.password,
        fullname: updateUserDto.fullname ?? user.fullname
      }

      const newUser = await this.prisma.users.update({
        data: updatedUser,
        where: { id: id }
      });

      return { message: "User updated", newUser: newUser };

    } catch (error) {
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.users.findFirst({ where: { id: id } });

      if (!user) {
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
      }

      const newUser = await this.prisma.users.delete({
        where: { id: id }
      });

      return { message: "User deleted", newUser: newUser };

    } catch (error) {
      throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
