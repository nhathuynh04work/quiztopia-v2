import { JwtRefreshTokenPayload } from "@/tokens/tokens.type";
import authConfiguration from "@/config/auth.config";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { type ConfigType } from "@nestjs/config";
import { AuthTokens, JwtAccessTokenPayload } from "./tokens.type";
import { TOKEN_TYPES } from "@/config/constants/auth.constant";
import { createHash } from "crypto";

@Injectable()
export class TokensService {
  constructor(
    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,

    private readonly jwtService: JwtService,
  ) {}

  hashToken(token: string) {
    return createHash("sha256").update(token).digest("hex");
  }

  buildAuthTokensPayloads(userId: string, sessionId: string) {
    const accessTokenPayload: JwtAccessTokenPayload = {
      uid: userId,
      type: TOKEN_TYPES.ACCESS,
    };

    const refreshTokenPayload: JwtRefreshTokenPayload = {
      uid: userId,
      sid: sessionId,
      type: TOKEN_TYPES.REFRESH,
    };

    return {
      accessTokenPayload,
      refreshTokenPayload,
    };
  }

  generateAuthTokens(userId: string, sessionId: string): AuthTokens {
    const payloads = this.buildAuthTokensPayloads(userId, sessionId);

    return {
      accessToken: this.generateAccessToken(payloads.accessTokenPayload),
      refreshToken: this.generateRefreshToken(payloads.refreshTokenPayload),
    };
  }

  private generateAccessToken(payload: JwtAccessTokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.authConfig.jwtAccessSecret,
      expiresIn: this.authConfig.accessTokenExpiresMs / 1000,
    });
  }

  private generateRefreshToken(payload: JwtRefreshTokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.authConfig.jwtRefreshSecret,
      expiresIn: this.authConfig.refreshTokenExpiresMs / 1000,
    });
  }
}
