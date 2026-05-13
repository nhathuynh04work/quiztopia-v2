import { Module } from "@nestjs/common";
import { SessionsService } from "./sessions.service";
import { ExpiredSessionsCleanupJob } from "./cleanup/expired-sessions-cleanup.job";
import { RevokedSessionsCleanupJob } from "./cleanup/revoked-sessions-cleanup.job";

@Module({
  providers: [
    SessionsService,
    ExpiredSessionsCleanupJob,
    RevokedSessionsCleanupJob,
  ],
  exports: [SessionsService],
})
export class SessionsModule {}
