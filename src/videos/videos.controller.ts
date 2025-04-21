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
import { VideosService } from './videos.service';
import { Prisma, Video } from '@prisma/client';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: Prisma.VideoCreateInput): Promise<Video> {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.videosService.findOne({ id });
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateVideoDto: Prisma.VideoUpdateInput,
  ) {
    return this.videosService.update({ id }, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
