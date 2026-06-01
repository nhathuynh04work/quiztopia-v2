import { Module } from "@nestjs/common";
import { SessionsService } from "./sessions.service";
import { ExpiredSessionsCleanupJob } from "./cleanup/expired-sessions-cleanup.job";
import { RevokedSessionsCleanupJob } from "./cleanup/revoked-sessions-cleanup.job";
import { SessionRotationService } from "./rotation/session-rotation.service";
import { TokensModule } from "@/tokens/tokens.module";
import { SessionMetadataService } from "./metadata/session-metadata.service";
import { SessionsController } from "./sessions.controller";

@Module({
  imports: [TokensModule],
  providers: [
    SessionsService,
    SessionRotationService,
    SessionMetadataService,
    ExpiredSessionsCleanupJob,
    RevokedSessionsCleanupJob,
  ],
  exports: [SessionsService, SessionRotationService, SessionMetadataService],
  controllers: [SessionsController],
})
export class SessionsModule {}
