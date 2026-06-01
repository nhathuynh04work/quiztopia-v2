import {
  Controller,
  Get,
  UseGuards,
  Req,
  Delete,
  Param,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { SessionsService } from "./sessions.service";
import { JwtSessionManagementGuard } from "@/auth/guards/jwt-session-management.guard";
import { type AuthenticatedRequest } from "@/auth/auth.type";

@UseGuards(JwtSessionManagementGuard)
@Controller("sessions")
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  async getActiveSessions(@Req() req: AuthenticatedRequest) {
    return this.sessionsService.getActiveSessionsOfUser(req.user.id);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async revokeSession(@Param("id") id: string) {
    await this.sessionsService.revokeSession(id);
  }
}
