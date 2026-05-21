import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDTO } from "./schemas/signup.schema";
import { LoginDTO } from "./schemas/login.schema";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import type {
  AuthenticatedRequest,
  RefreshAuthenticatedRequest,
} from "./auth.type";
import { SessionsService } from "src/sessions/sessions.service";
import { JwtAccessGuard } from "./guards/jwt-access.guard";
import { SessionRotationService } from "src/sessions/session-rotation.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionsService: SessionsService,
    private readonly sessionRotationService: SessionRotationService,
  ) {}

  @Post("signup")
  async signup(@Body() payload: SignupDTO) {
    const user = await this.authService.signup(payload);

    return user;
  }

  @Post("login")
  async login(@Body() payload: LoginDTO) {
    const tokens = await this.authService.loginWithPassword(
      payload.email,
      payload.password,
    );

    return tokens;
  }

  @UseGuards(JwtRefreshGuard)
  @Post("refresh")
  async refresh(@Req() req: RefreshAuthenticatedRequest) {
    const newTokens = await this.sessionRotationService.rotateSession(
      req.user.sid,
      req.user.refreshToken,
    );

    return newTokens;
  }

  @UseGuards(JwtRefreshGuard)
  @Post("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Req() req: RefreshAuthenticatedRequest) {
    await this.sessionsService.revokeSession(req.user.sid);
  }

  @UseGuards(JwtRefreshGuard)
  @Post("logout/all")
  @HttpCode(HttpStatus.NO_CONTENT)
  async logoutAll(@Req() req: RefreshAuthenticatedRequest) {
    await this.sessionsService.revokeAllSessionsOfUser(req.user.id);
  }

  @UseGuards(JwtAccessGuard)
  @Get("me")
  getCurrentUser(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
