import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  const isProd = process.env.NODE_ENV === 'production';
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:4200', 'https://show-off.adi.so'],
  });
  app.use(cookieParser(process.env.COOKIE_SECRET));
  const devContentSecurityPolicy = {
    directives: {
      manifestSrc: ["'self'", '*.cdn.apollographql.com'],
      scriptSrc: ["'self'", "'unsafe-inline'", '*.cdn.apollographql.com'],
      frameSrc: ["'self'", '*.embed.apollographql.com'],
      imgSrc: ["'self'", 'data:', '*.cdn.apollographql.com'],
    },
  };

  app.use(
    helmet({
      // when undefined it will load the default option: https://github.com/graphql/graphql-playground/issues/1283#issuecomment-723705276
      contentSecurityPolicy: isProd ? undefined : devContentSecurityPolicy,
      crossOriginEmbedderPolicy: false,
    })
  );
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
