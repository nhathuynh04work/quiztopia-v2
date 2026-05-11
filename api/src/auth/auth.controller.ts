import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDTO } from "./schemas/signup.schema";
import { LoginDTO } from "./schemas/login.schema";

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
  async login(@Body() payload: LoginDTO) {
    const user = await this.authService.authenticateWithPassword(
      payload.email,
      payload.password,
    );

    return user;
  }
}
