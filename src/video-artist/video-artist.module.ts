import { Module } from '@nestjs/common';
import { VideoArtistService } from './video-artist.service';
import { VideoArtistController } from './video-artist.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [VideoArtistController],
  providers: [VideoArtistService, PrismaService],
})
export class VideoArtistModule {}
