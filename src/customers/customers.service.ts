import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCarDto: CreateCustomerDto) {
    const car = await this.prisma.customers.create({
      data: createCarDto
    })
    return car
  }

  async findAll() {
    return this.prisma.customers.findMany()
  }

  async findOne(id: string) {
    return this.prisma.customers.findUnique({
      where: {
        id: id
      }
    })
  }

  async update(id: string, data: any) {
    try {
      const car = await this.prisma.customers.findUnique({
        where: {
          id: id
        }
      })
      if (!car) {
        throw new NotFoundException(`customer with ID ${id} not found`);
      }

      return this.prisma.customers.update({
        where: {
          id,
        },
        data,
      })


    } catch (error) {
      throw new error
    }
  }

  async remove(id: string) {
    const car = await this.prisma.customers.findUnique({
      where: {
        id,
      },
    });

    if (!car) {
      throw new NotFoundException(`customer with ID ${id} not found`);
    }

    return this.prisma.customers.delete({
      where: {
        id,
      },
    });
  }
}