import authConfiguration from "src/config/auth.config";
import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthUser } from "../auth.type";
import {
  AUTH_STRATEGY_NAMES,
  TOKEN_TYPES,
} from "src/config/constants/auth.constant";
import { UsersService } from "src/users/users.service";
import { type ConfigType } from "@nestjs/config";
import { accessTokenExtractor } from "../extractors/jwt-access.extractor";
import { JwtAccessTokenPayload } from "src/tokens/tokens.type";
import { InvalidCredentialsError } from "src/common/errors/auth/invalid-credentials.error";

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  AUTH_STRATEGY_NAMES.JWT_ACCESS,
) {
  constructor(
    private readonly usersService: UsersService,

    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        accessTokenExtractor.fromCookie,
      ]),
      secretOrKey: authConfig.jwtAccessSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtAccessTokenPayload): Promise<AuthUser> {
    if (payload.type !== TOKEN_TYPES.ACCESS) {
      throw new InvalidCredentialsError();
    }

    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
