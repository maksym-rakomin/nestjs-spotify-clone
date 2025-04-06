import { DataSource, DataSourceOptions } from 'typeorm';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../src/users/user.entity';
import { Playlist } from '../src/playlists/playlist.entity';
import { Song } from '../src/songs/song.entity';
import { Artist } from '../src/artists/artist.entity';
import * as process from 'node:process';
require('dotenv').config();

export const dataSourceOptions: DataSourceOptions = {
  // url: 'postgresql://postgres:LULCnfxYqYWmGnaPaLMvnVgetGvOciZc@caboose.proxy.rlwy.net:17527/railway',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [User, Playlist, Song, Artist],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      username: configService.get<string>('username'),
      database: configService.get<string>('dbName'),
      password: configService.get<string>('password'),
      entities: [User, Playlist, Song, Artist],
      synchronize: false,
      migrations: ['dist/db/migrations/*.js'],
    };
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
