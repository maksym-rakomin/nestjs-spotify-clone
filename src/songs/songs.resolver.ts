import { Args, Query, Resolver } from '@nestjs/graphql';
import { SongsService } from './songs.service';
import { Song } from './song.entity';
import { HttpStatus, ParseIntPipe } from '@nestjs/common';

@Resolver()
export class SongsResolver {
  constructor(private readonly songsService: SongsService) {}

  @Query('songs')
  getSongs(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Query('song')
  getSong(
    @Args(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song | null> {
    return this.songsService.findOne(id);
  }
}
