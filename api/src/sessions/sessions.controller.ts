import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { SessionsService } from "./sessions.service";
import { SessionManagementGuard } from "@/auth/guards/session-management.guard";
import { type AuthenticatedRequest } from "@/auth/auth.type";

@Controller("sessions")
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @UseGuards(SessionManagementGuard)
  @Get()
  async getActiveSessions(@Req() req: AuthenticatedRequest) {
    return this.sessionsService.getActiveSessionsOfUser(req.user.id);
  }
}
