import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/midelware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { DataSource } from 'typeorm';
import { PlayListModule } from './playlists/playlist.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { dataSourceOptions } from '../db/data-source';

// Development configuration
const devConfig = { port: 3000 };

// Production configuration
const proConfig = { port: 4000 };

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    SongsModule,
    PlayListModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: DevConfigService, useClass: DevConfigService },
    {
      provide: 'CONFIG',
      useFactory: (): any => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('DB name -', dataSource.options.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs/*'); // option 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); // option 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController); // option 3
  }
}
