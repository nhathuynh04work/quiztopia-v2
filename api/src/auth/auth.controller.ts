import authConfiguration from "../config/auth.config";
import { Body, Controller, Inject, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDTO } from "./schemas/signup.schema";
import { LoginDTO } from "./schemas/login.schema";
import { type Response } from "express";
import { type ConfigType } from "@nestjs/config";
import { AUTH_COOKIE_NAMES } from "src/config/constants/auth.constant";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @Inject(authConfiguration.KEY)
    private readonly authConfig: ConfigType<typeof authConfiguration>,
  ) {}

  @Post("signup")
  async signup(@Body() payload: SignupDTO) {
    const user = await this.authService.signup(payload);

    return {
      user,
      message: "User signed up successfully",
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

    res.cookie(AUTH_COOKIE_NAMES.ACCESS_TOKEN, tokens.accessToken, {
      ...this.authConfig.cookie,
      maxAge: this.authConfig.accessTokenExpiresMs,
    });

    res.cookie(AUTH_COOKIE_NAMES.REFRESH_TOKEN, tokens.refreshToken, {
      ...this.authConfig.cookie,
      maxAge: this.authConfig.refreshTokenExpiresMs,
    });

    return { message: "Log in successfully" };
  }
}
