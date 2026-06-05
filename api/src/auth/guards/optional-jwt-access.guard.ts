import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AUTH_STRATEGY_NAMES } from "@/config/constants/auth.constant";

@Injectable()
export class OptionalJwtAccessGuard extends AuthGuard(
  AUTH_STRATEGY_NAMES.JWT_ACCESS,
) {
  override handleRequest(err: any, user: any) {
    return user || null;
  }
}
