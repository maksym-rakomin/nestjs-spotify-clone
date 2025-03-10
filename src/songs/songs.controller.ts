import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  create(): string[] {
    return this.songsService.create('test');
  }

  @Get()
  findAll(): string[] {
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
