import authConfiguration from "@/config/auth.config";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { RefreshAuthUser } from "../auth.type";
import {
  AUTH_STRATEGY_NAMES,
  TOKEN_TYPES,
} from "@/config/constants/auth.constant";
import { UsersService } from "@/users/users.service";
import { type ConfigType } from "@nestjs/config";
import { refreshTokenExtractor } from "../extractors/jwt-refresh.extractor";
import { JwtRefreshTokenPayload } from "@/tokens/tokens.type";
import { InvalidCredentialsError } from "@/common/errors/auth/invalid-credentials.error";
import { Request } from "express";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  AUTH_STRATEGY_NAMES.JWT_REFRESH,
) {
  constructor(
    private readonly usersService: UsersService,

    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        refreshTokenExtractor.fromCookie,
      ]),
      secretOrKey: authConfig.jwtRefreshSecret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: JwtRefreshTokenPayload,
  ): Promise<RefreshAuthUser> {
    const refreshToken = refreshTokenExtractor.fromCookie(req);

    if (!refreshToken) {
      throw new InvalidCredentialsError();
    }

    if (payload.type !== TOKEN_TYPES.REFRESH) {
      throw new InvalidCredentialsError();
    }

    const user = await this.usersService.findById(payload.uid);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      sid: payload.sid,
      refreshToken: refreshToken,
    };
  }
}
