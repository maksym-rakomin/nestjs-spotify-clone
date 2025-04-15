import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { join } from 'node:path';
import { Request } from 'express';
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
import { typeOrmAsyncConfig } from '../db/data-source';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from '../.env.validation';
import { EventsModule } from './events/events.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';
// Development configuration
const devConfig = { port: 3000 };

// Production configuration
const proConfig = { port: 4000 };

const dataSources = () => ({
  todoAPI: new TodoService(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SongsModule,
    PlayListModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    SeedModule,
    EventsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      plugins: [
        ApolloServerPluginCacheControl({ defaultMaxAge: 5 }),
        responseCachePlugin(),
      ],
      context: ({ req }: { req: Request }) => ({
        req,
        dataSources,
      }),
      installSubscriptionHandlers: true,
    }),
    TodoModule,
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
  constructor(private typeOrmAsyncConfig: DataSource) {
    console.log('DB name -', typeOrmAsyncConfig.options.database);
  }

  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs/*'); // option 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); // option 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController); // option 3
  }
}
