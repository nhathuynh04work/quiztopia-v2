import { Module } from "@nestjs/common";
import { SessionsService } from "./sessions.service";
import { ExpiredSessionsCleanupJob } from "./cleanup/expired-sessions-cleanup.job";
import { RevokedSessionsCleanupJob } from "./cleanup/revoked-sessions-cleanup.job";
import { SessionRotationService } from "./session-rotation.service";

@Module({
  providers: [
    SessionsService,
    SessionRotationService,
    ExpiredSessionsCleanupJob,
    RevokedSessionsCleanupJob,
  ],
  exports: [SessionsService, SessionRotationService],
})
export class SessionsModule {}
