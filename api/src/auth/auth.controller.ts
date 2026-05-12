import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDTO } from "./schemas/signup.schema";
import { LoginDTO } from "./schemas/login.schema";
import { type Response } from "express";
import {
  accessTokenCookieConfig,
  refreshTokenCookieConfig,
} from "../config/cookie.config";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

    res.cookie("accessToken", tokens.accessToken, accessTokenCookieConfig);
    res.cookie("refreshToken", tokens.refreshToken, refreshTokenCookieConfig);

    return { message: "Log in successfully" };
  }
}
