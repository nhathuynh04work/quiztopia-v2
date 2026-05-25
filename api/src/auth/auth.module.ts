import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UsersModule } from "@/users/users.module";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { SessionsModule } from "@/sessions/sessions.module";
import { TokensModule } from "@/tokens/tokens.module";
import { PrismaModule } from "@/common/prisma/prisma.module";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    SessionsModule,
    TokensModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
