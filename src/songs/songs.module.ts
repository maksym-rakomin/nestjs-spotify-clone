import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from '../common/constants/connections';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { User } from '../users/user.entity';
import { Artist } from '../artists/artist.entity';
import { SongsResolver } from './songs.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist, User])],
  controllers: [SongsController],
  providers: [
    SongsService,
    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
    SongsResolver,
  ],
})
export class SongsModule {}
