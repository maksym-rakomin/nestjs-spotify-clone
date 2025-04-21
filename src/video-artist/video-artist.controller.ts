import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { VideoArtistService } from './video-artist.service';
import { Prisma } from '@prisma/client';

@Controller('video-artist')
export class VideoArtistController {
  constructor(private readonly videoArtistService: VideoArtistService) {}

  @Post()
  create(@Body() createVideoArtistDto: Prisma.VideoArtistCreateInput) {
    return this.videoArtistService.create(createVideoArtistDto);
  }

  @Get()
  findAll() {
    return this.videoArtistService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.videoArtistService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateVideoArtistDto: Prisma.VideoArtistUpdateInput,
  ) {
    return this.videoArtistService.update({ id }, updateVideoArtistDto);
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.videoArtistService.remove(+id);
  }
}
