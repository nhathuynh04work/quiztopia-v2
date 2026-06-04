import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { SessionsService } from "../sessions.service";
import { JobRunnerService } from "@/common/jobs/job-runner.service";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class ExpiredSessionsCleanupJob {
  constructor(
    private readonly logger: PinoLogger,
    private readonly jobRunner: JobRunnerService,
    private readonly sessionsService: SessionsService,
  ) {
    this.logger.setContext(ExpiredSessionsCleanupJob.name);
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async handle() {
    await this.jobRunner.run(ExpiredSessionsCleanupJob.name, async () => {
      const { count } = await this.sessionsService.cleanupExpiredSessions();

      this.logger.info(`Deleted ${count} EXPIRED sessions`);
    });
  }
}
