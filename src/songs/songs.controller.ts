import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Song } from './types';
import { Connection } from '../common/constants/connections';

@Controller('songs')
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log('This is connection string', this.connection);
  }

  @Post()
  create(@Body() createSongDTO: CreateSongDto): Song[] {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll(): Song[] {
    try {
      return this.songsService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error form DB',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): string {
    return `This action returns a #id song ${typeof id}`;
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
