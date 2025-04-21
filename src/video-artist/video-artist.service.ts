import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, VideoArtist } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VideoArtistService {
  constructor(private prisma: PrismaService) {}

  create(
    createVideoArtistDto: Prisma.VideoArtistCreateInput,
  ): Promise<VideoArtist> {
    return this.prisma.videoArtist.create({
      data: createVideoArtistDto,
    });
  }

  async findAll(): Promise<VideoArtist[]> {
    return this.prisma.videoArtist.findMany();
  }

  async findOne(
    where: Prisma.VideoArtistWhereUniqueInput,
  ): Promise<VideoArtist | null> {
    const videoArtist = await this.prisma.videoArtist.findUnique({
      where,
    });

    if (!videoArtist) {
      throw new NotFoundException(`VideoArtist с ID ${where.id} не найден`);
    }

    return videoArtist;
  }

  update(
    where: Prisma.VideoArtistWhereUniqueInput,
    updateVideoArtistDto: Prisma.VideoArtistUpdateInput,
  ): Promise<VideoArtist> {
    return this.prisma.videoArtist.update({
      where,
      data: updateVideoArtistDto,
    });
  }

  remove(id: number): Promise<VideoArtist> {
    return this.prisma.videoArtist.delete({
      where: { id },
    });
  }
}
