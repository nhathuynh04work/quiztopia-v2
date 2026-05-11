import { CreateUserDTO } from "src/users/schemas/create-user.schema";
import { Body, Controller, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/signup")
  async signup(@Body() payload: CreateUserDTO) {
    const user = await this.authService.signup(payload);

    return {
      user,
      message: "User signed up successfully",
    };
  }
}
