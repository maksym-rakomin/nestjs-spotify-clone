import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async login(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userService.findOne(loginDTO);
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (passwordMatched) {
      delete (user as Partial<User>).password;
      return user;
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }
}
