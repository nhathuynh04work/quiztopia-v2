import authConfiguration from "src/config/auth.config";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { RefreshAuthUser } from "../auth.type";
import {
  AUTH_STRATEGY_NAMES,
  TOKEN_TYPES,
} from "src/config/constants/auth.constant";
import { UsersService } from "src/users/users.service";
import { type ConfigType } from "@nestjs/config";
import { refreshTokenExtractor } from "../extractors/jwt-refresh.extractor";
import { JwtRefreshTokenPayload } from "src/tokens/tokens.type";

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
    });
  }

  async validate(payload: JwtRefreshTokenPayload): Promise<RefreshAuthUser> {
    if (payload.type !== TOKEN_TYPES.REFRESH) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      jti: payload.jti,
    };
  }
}
