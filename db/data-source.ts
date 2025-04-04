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

const commonConfig = {
  type: 'postgres' as const,
  entities: [User, Playlist, Song, Artist],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  // Оптимизация пула соединений
  extra: {
    max: 20, // максимальное количество соединений в пуле
    connectionTimeoutMillis: 5000, // таймаут соединения
    idleTimeoutMillis: 30000, // таймаут простоя
  },
  // Оптимизация кэширования
  cache: {
    type: 'memory',
    duration: 60000, // время кэширования в миллисекундах
  },
  // Оптимизация запросов
  logging: false,
  maxQueryExecutionTime: 1000, // логировать запросы, выполняющиеся дольше 1 секунды
};

export const dataSourceOptions: DataSourceOptions = {
  ...commonConfig,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    return {
      ...commonConfig,
      host: configService.get<string>('dbHost'),
      port: configService.get<number>('dbPort'),
      username: configService.get<string>('username'),
      database: configService.get<string>('dbName'),
      password: configService.get<string>('password'),
    };
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
