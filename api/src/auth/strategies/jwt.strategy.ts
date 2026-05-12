import authConfiguration from "src/config/auth.config";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtAccessTokenPayload } from "../auth.type";
import {
  AUTH_COOKIE_NAMES,
  TOKEN_TYPES,
} from "src/config/constants/auth.constant";
import { UsersService } from "src/users/users.service";
import { Request } from "express";
import { type ConfigType } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const cookies = req.cookies as Record<string, unknown>;
          const token = cookies[AUTH_COOKIE_NAMES.ACCESS_TOKEN];
          return typeof token === "string" ? token : null;
        },
      ]),
      secretOrKey: authConfig.jwtAccessSecret,
    });
  }

  async validate(payload: JwtAccessTokenPayload) {
    if (payload.type !== TOKEN_TYPES.ACCESS) {
      throw new UnauthorizedException();
    }

    const user = await this.usersService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
