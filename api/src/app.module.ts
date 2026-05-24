import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./common/prisma/prisma.module";
import { SessionsModule } from "./sessions/sessions.module";
import { TokensModule } from "./tokens/tokens.module";
import configuration from "./config/configuration";
import { ScheduleModule } from "@nestjs/schedule";
import { JobsModule } from "./common/jobs/jobs.module";
import { CacheModule } from "@nestjs/cache-manager";
import KeyvRedis from "@keyv/redis";
import cacheConfiguration from "./config/cache.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configuration,
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

    PrismaModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    TokensModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
