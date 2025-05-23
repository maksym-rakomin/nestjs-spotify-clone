import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { JwtAuthGuard } from './jwt-guard';
import { ArtistsModule } from '../artists/artists.module';
import { ApiKeyStrategy } from './api-key-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('secret'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    ArtistsModule,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    ApiKeyStrategy,
    AuthResolver,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
