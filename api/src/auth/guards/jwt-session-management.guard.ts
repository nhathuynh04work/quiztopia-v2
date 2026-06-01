import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AUTH_STRATEGY_NAMES } from "@/config/constants/auth.constant";

@Injectable()
export class JwtSessionManagementGuard extends AuthGuard(
  AUTH_STRATEGY_NAMES.JWT_SESSION_MANAGEMENT,
) {}
