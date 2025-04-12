import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { SongsService } from './songs.service';
import { Song } from './song.entity';
import { HttpStatus, ParseIntPipe } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { GraphQLError } from 'graphql/error';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';

const pubSub: PubSubEngine = new PubSub();

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
    if (id === 0) {
      throw new GraphQLError('My custom error for song id === 0', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      });
    }
    return this.songsService.findOne(id);
  }

  @Mutation('createSong')
  async createSong(
    @Args('createSongInput')
    args: CreateSongDto,
  ): Promise<Song> {
    const newSong = await this.songsService.create(args);
    await pubSub.publish('songCreated', { songCreated: newSong });
    return newSong;
  }

  @Mutation('updateSong')
  updateSong(
    @Args('updateSongInput')
    args: UpdateSongDto,
    @Args(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, args);
  }

  @Mutation('deleteSong')
  deleteSong(
    @Args(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    return this.songsService.delete(id);
  }

  @Subscription('songCreated')
  songCreated() {
    return pubSub.asyncIterableIterator('songCreated');
  }
}
