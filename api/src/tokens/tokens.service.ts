import authConfiguration from "src/config/auth.config";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { type ConfigType } from "@nestjs/config";
import { TOKEN_TYPES } from "src/config/constants/auth.constant";
import {
  AuthTokens,
  JwtAccessTokenPayload,
  JwtRefreshTokenPayload,
} from "./tokens.type";

@Injectable()
export class TokensService {
  constructor(
    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,

    private readonly jwtService: JwtService,
  ) {}

  generateAuthTokens(userId: string, sessionId: string): AuthTokens {
    const accessTokenPayload: JwtAccessTokenPayload = {
      sub: userId,
      type: TOKEN_TYPES.ACCESS,
    };

    const refreshTokenPayload: JwtRefreshTokenPayload = {
      sub: userId,
      jti: sessionId,
      type: TOKEN_TYPES.REFRESH,
    };

    return {
      accessToken: this.generateAccessToken(accessTokenPayload),
      refreshToken: this.generateRefreshToken(refreshTokenPayload),
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
