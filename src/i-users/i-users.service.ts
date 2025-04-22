import { Injectable } from '@nestjs/common';
import { CreateIUserDto } from './dto/create-i-user.dto';
import { UpdateIUserDto } from './dto/update-i-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IUsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateIUserDto) {
    return this.prisma.iUser.create({
      data: {
        name: createUserDto.name,
        profile: {
          create: {
            phone: createUserDto.phone,
            photo: createUserDto.photo,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.iUser.findMany();
    // return this.prisma.iUser.findMany({ include: { profile: true } });
  }

  async findOne(id: number) {
    return this.prisma.iUser.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateIUserDto: UpdateIUserDto) {
    return this.prisma.iUser.update({
      where: { id },
      data: updateIUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.iUser.delete({
      where: { id },
    });
  }
}
