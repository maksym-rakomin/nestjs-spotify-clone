import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Song } from './types';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  create(@Body() createSongDTO: CreateSongDto): Song[] {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll(): Song[] {
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(): string {
    return 'This action returns a #id song';
  }

  @Put(':id')
  update(): string {
    return 'This action update a #id song';
  }

  @Delete(':id')
  delete(): string {
    return 'This action deleting a #id song';
  }
}
