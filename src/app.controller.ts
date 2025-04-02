import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JWT_AUTH } from './auth/auth.constants';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @ApiBearerAuth(JWT_AUTH)
  @UseGuards(JwtAuthGuard)
  getProfile(
    @Req()
    request: Request & { user: { id: number; username: string } },
  ) {
    return request.user;
  }
}
