import { CookiesService } from "./../cookies/cookies.service";
import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDTO } from "./schemas/signup.schema";
import { LoginDTO } from "./schemas/login.schema";
import { type Response } from "express";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import { type RefreshAuthenticatedRequest } from "./auth.type";
import { SessionsService } from "src/sessions/sessions.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookiesService: CookiesService,
    private readonly sessionsService: SessionsService,
  ) {}

  @Post("signup")
  async signup(@Body() payload: SignupDTO) {
    const user = await this.authService.signup(payload);

    return {
      user,
      message: "Signed up successfully",
    };
  }

  @Post("login")
  async login(
    @Body() payload: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.loginWithPassword(
      payload.email,
      payload.password,
    );

    this.cookiesService.setAuthCookies(res, tokens);

    return { message: "Logged in successfully" };
  }

  @UseGuards(JwtRefreshGuard)
  @Post("refresh")
  async refresh(
    @Req() req: RefreshAuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refresh(req.user);

    this.cookiesService.setAuthCookies(res, tokens);

    return { message: "Refreshed successfully" };
  }

  @UseGuards(JwtRefreshGuard)
  @Post("logout")
  async logout(
    @Req() req: RefreshAuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.sessionsService.revokeSession(req.user.jti);
    this.cookiesService.clearAuthCookies(res);

    return { message: "Logged out successfully" };
  }

  @UseGuards(JwtRefreshGuard)
  @Post("logout/all")
  async logoutAll(
    @Req() req: RefreshAuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.sessionsService.revokeAllSessionsOfUser(req.user.id);
    this.cookiesService.clearAuthCookies(res);

    return { message: "Logged out of all device" };
  }
}
