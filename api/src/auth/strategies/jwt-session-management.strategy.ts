import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { AuthUser } from "../auth.type";
import {
  AUTH_STRATEGY_NAMES,
  TOKEN_TYPES,
} from "@/config/constants/auth.constant";
import { UsersService } from "@/users/users.service";
import { type ConfigType } from "@nestjs/config";
import { JwtSessionManagementPayload } from "@/tokens/tokens.type";
import { InvalidCredentialsError } from "@/common/errors/auth/invalid-credentials.error";
import { extractJwtFromAuthBearer } from "../helpers/token-extractor";
import { authConfiguration } from "@/config";

@Injectable()
export class JwtSessionManagementStrategy extends PassportStrategy(
  Strategy,
  AUTH_STRATEGY_NAMES.JWT_SESSION_MANAGEMENT,
) {
  constructor(
    private readonly usersService: UsersService,

    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,
  ) {
    super({
      jwtFromRequest: extractJwtFromAuthBearer,
      secretOrKey: authConfig.jwtSessionManagementSecret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtSessionManagementPayload): Promise<AuthUser> {
    if (payload.type !== TOKEN_TYPES.SESSION_MANAGEMENT) {
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
    };
  }
}
