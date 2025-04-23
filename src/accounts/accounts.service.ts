import { Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { TransferAccountDTO } from './dto/transfer-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  create(createAccountDto: Prisma.AccountCreateInput) {
    return this.prisma.account.create({ data: createAccountDto });
  }

  transfer(transferAccountDTO: TransferAccountDTO) {
    const { sender: from, receiver: to, amount } = transferAccountDTO;
    return this.prisma.$transaction(async (prisma) => {
      // John Account
      // 1. Decrement amount from the sender.
      const sender = await prisma.account.update({
        data: {
          balance: {
            decrement: amount,
          },
        },
        where: {
          id: from,
        },
      });

      // 2. Verify that the sender's balance didn't go below zero.
      if (sender.balance < 0) {
        throw new Error(`${from} doesn't have enough to send ${amount}`);
      }

      // 3. Increment the recipient's balance by amount
      // SAM Account
      const recipient = await prisma.account.update({
        data: {
          balance: {
            increment: amount,
          },
        },
        where: {
          id: to,
        },
      });

      return recipient;
    });
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
