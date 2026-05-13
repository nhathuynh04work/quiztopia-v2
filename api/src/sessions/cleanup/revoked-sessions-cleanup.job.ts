import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { SessionsService } from "../sessions.service";
import { JobRunnerService } from "src/common/jobs/job-runner.service";

@Injectable()
export class RevokedSessionsCleanupJob {
  private readonly logger = new Logger(RevokedSessionsCleanupJob.name);

  constructor(
    private readonly jobRunner: JobRunnerService,
    private readonly sessionsService: SessionsService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handle() {
    await this.jobRunner.run(RevokedSessionsCleanupJob.name, async () => {
      const { count } = await this.sessionsService.cleanupRevokedSessions();

      this.logger.log(`Deleted ${count} REVOKED sessions`);
    });
  }
}
