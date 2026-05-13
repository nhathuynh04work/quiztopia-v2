import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./common/prisma/prisma.module";
import { SessionsModule } from "./sessions/sessions.module";
import { TokensModule } from "./tokens/tokens.module";
import { CookiesModule } from "./cookies/cookies.module";
import configuration from "./config/configuration";
import { ScheduleModule } from "@nestjs/schedule";
import { JobsModule } from "./common/jobs/jobs.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configuration,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    TokensModule,
    CookiesModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
