import { Injectable } from '@nestjs/common';
import { Prisma, Video } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  create(createVideoDto: Prisma.VideoUncheckedCreateInput): Promise<Video> {
    return this.prisma.video.create({
      data: createVideoDto,
    });
  }

  findAll() {
    return this.prisma.video.findMany({
      include: { VideoArtist: true },
    });
  }

  findOne(where: Prisma.VideoWhereUniqueInput): Promise<Video | null> {
    return this.prisma.video.findUnique({ where });
  }

  update(
    where: Prisma.VideoWhereUniqueInput,
    updateVideoDto: Prisma.VideoUpdateInput,
  ) {
    return this.prisma.video.update({ where, data: updateVideoDto });
  }

  remove(id: number) {
    return this.prisma.video.delete({ where: { id } });
  }
}
