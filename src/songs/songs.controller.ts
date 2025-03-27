import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Scope,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Song } from './song.entity';
import { Connection } from '../common/constants/connections';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtArtistGuard } from '../auth/jwt-artist.guard';
import { PayloadType } from '../auth/auth.types';

@Controller({ path: 'songs', scope: Scope.REQUEST })
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION') private connection: Connection,
  ) {
    console.log('This is connection string', this.connection);
  }

  @Post()
  @UseGuards(JwtArtistGuard)
  create(
    @Body() createSongDTO: CreateSongDto,
    @Request() req: Request & { user: PayloadType },
  ): Promise<Song> {
    console.log(req.user);
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('sortBy', new DefaultValuePipe('id')) sortBy: string,
    @Query('order', new DefaultValuePipe('ASC')) order: 'ASC' | 'DESC',
  ): Promise<Pagination<Song>> {
    const allowedSortFields = ['id', 'title', 'author', 'createdAt'];
    if (!allowedSortFields.includes(sortBy)) {
      sortBy = 'id';
    }

    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({ page, limit }, sortBy, order);
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song | null> {
    return this.songsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsService.delete(id);
  }
}
