import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, AuthModule } from '@show-off/api/auth';
import { join } from 'path';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { ApiUsersModule } from '@show-off/api/users';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => {
        const isProd = configService.get('NODE_ENV') === 'production';
        return {
          typePaths: isProd
            ? ['./**/*.graphql']
            : [join(process.cwd(), 'libs/**/*.graphql'), './**/*.graphql'],
          cors: {
            origin: true,
            credentials: true,
          },
          context: ({ req, res }) => ({ req, res }),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    ApiUsersModule,
  ],
  providers: [
    AppResolver,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
