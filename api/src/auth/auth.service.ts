import { Injectable, Logger } from "@nestjs/common";
import { CreateUserDTO } from "src/users/schemas/create-user.schema";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly usersService: UsersService) {}

  async signup(payload: CreateUserDTO) {
    const user = await this.usersService.create(payload);

    return user;
  }
}
