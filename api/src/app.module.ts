import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./common/prisma/prisma.module";
import { SessionsModule } from "./sessions/sessions.module";
import { TokensModule } from "./tokens/tokens.module";
import { ScheduleModule } from "@nestjs/schedule";
import { JobsModule } from "./common/jobs/jobs.module";
import { CacheModule } from "@nestjs/cache-manager";
import KeyvRedis from "@keyv/redis";
import configs, { appConfiguration, cacheConfiguration } from "./config";
import { LoggerModule } from "nestjs-pino";
import { randomUUID } from "crypto";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import { GlobalExceptionFilter } from "./common/filters/global-exception.filter";
import { ZodValidationPipe } from "./common/pipes/zod-validation.pipe";
import { QuizzesModule } from "./quizzes/quizzes.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [cacheConfiguration.KEY],
      useFactory: (cacheConfig: ConfigType<typeof cacheConfiguration>) => ({
        stores: [new KeyvRedis(cacheConfig.storeUrl)],
        ttl: cacheConfig.defaultTTL,
      }),
    }),
    ScheduleModule.forRoot(),
    LoggerModule.forRootAsync({
      inject: [appConfiguration.KEY],
      useFactory: (appConfig: ConfigType<typeof appConfiguration>) => ({
        pinoHttp: {
          serializers: {
            req: (req) => ({
              id: req.id,
              method: req.method,
              url: req.url,
            }),

            res: (res) => ({
              statusCode: res.statusCode,
            }),
          },
          level: "info",
          genReqId: () => randomUUID(),
          customReceivedMessage: (req, res) => `---> ${req.method} ${req.url}`,
          customSuccessMessage: (req, res) =>
            `<--- ${req.method} ${req.url} ${res.statusCode}`,
          customErrorMessage: (req, res, error) =>
            `${req.method} ${req.url} failed: ${error.message}`,
          transport: appConfig.isProd ? undefined : { target: "pino-pretty" },
        },
      }),
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    TokensModule,
    JobsModule,
    QuizzesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_PIPE, useClass: ZodValidationPipe },
  ],
})
export class AppModule {}
