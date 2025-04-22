import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JWT_AUTH } from './auth/auth.constants';
// import { SeedService } from './seed/seed.service';

declare const module: {
  hot?: {
    accept: () => void;
    dispose: (callback?: () => Promise<void>) => void;
  };
};

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, new FastifyAdapter());
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Seeding DB
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  //Configure the swagger module here
  const config = new DocumentBuilder()
    .setTitle('Spotify Clone')
    .setDescription('The Spotify Clone Api documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      JWT_AUTH,
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService); // get the instance of ConfigService using app.get
  await app.listen(configService.get<number>('port') ?? 3000);

  console.log(configService.get<string>('NODE_ENV'));

  if (module?.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
