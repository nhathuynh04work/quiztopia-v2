import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AUTH_STRATEGY_NAMES } from "src/config/constants/auth.constant";

@Injectable()
export class JwtRefreshGuard extends AuthGuard(
  AUTH_STRATEGY_NAMES.JWT_REFRESH,
) {}
