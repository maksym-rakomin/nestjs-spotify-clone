import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    const user = new User();

    user.firstName = userDTO.firstName;
    user.lastName = userDTO.lastName;
    user.email = userDTO.email;
    user.apiKey = uuid4();
    user.password = await bcrypt.hash(userDTO.password, salt);

    const savedUser = await this.userRepository.save(user);

    delete (savedUser as Partial<User>).password;
    return savedUser;
  }

  async findOne(data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }

  async findById(id: number): Promise<User | null> {
    return (await this.userRepository.findOneBy({ id: id })) || null;
  }

  async updateSecretKey(userId: number, secret: string): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        twoFASecret: secret,
        enable2FA: true,
      },
    );
  }

  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userRepository.update(
      { id: userId },
      {
        enable2FA: false,
        twoFASecret: null,
      },
    );
  }

  async findByApiKey(apiKey: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ apiKey });

    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }

    return user;
  }
}
