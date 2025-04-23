import { Injectable } from '@nestjs/common';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(createApplicationDto: Prisma.CustomerCreateInput) {
    try {
      return await this.prisma.customer.create({ data: createApplicationDto });
    } catch (error) {
      console.log(111, error);
      return {
        statusCode: 505,
        message: error.message,
      };
    }
  }

  findAll() {
    return `This action returns all application`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
