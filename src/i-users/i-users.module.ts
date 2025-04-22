import { Module } from '@nestjs/common';
import { IUsersService } from './i-users.service';
import { IUsersController } from './i-users.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [IUsersController],
  providers: [IUsersService, PrismaService],
})
export class IUsersModule {}
