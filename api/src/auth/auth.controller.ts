import { CreateUserDTO } from "src/users/schemas/create-user.schema";
import { UsersService } from "./../users/users.service";
import { Body, Controller, Get } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/signup")
  async signup(@Body() payload: CreateUserDTO) {
    const user = await this.usersService.create(payload);

    return {
      user,
      message: "User signed up successfully",
    };
  }
}
