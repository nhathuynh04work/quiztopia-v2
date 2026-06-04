import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { SessionsService } from "../sessions.service";
import { JobRunnerService } from "@/common/jobs/job-runner.service";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class RevokedSessionsCleanupJob {
  constructor(
    private readonly logger: PinoLogger,
    private readonly jobRunner: JobRunnerService,
    private readonly sessionsService: SessionsService,
  ) {
    this.logger.setContext(RevokedSessionsCleanupJob.name);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handle() {
    await this.jobRunner.run(RevokedSessionsCleanupJob.name, async () => {
      const { count } = await this.sessionsService.cleanupRevokedSessions();

      this.logger.info(`Deleted ${count} REVOKED sessions`);
    });
  }
}
