import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { SessionsService } from "../sessions.service";
import { JobRunnerService } from "@/common/jobs/job-runner.service";

@Injectable()
export class ExpiredSessionsCleanupJob {
  private readonly logger = new Logger(ExpiredSessionsCleanupJob.name);

  constructor(
    private readonly jobRunner: JobRunnerService,
    private readonly sessionsService: SessionsService,
  ) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async handle() {
    await this.jobRunner.run(ExpiredSessionsCleanupJob.name, async () => {
      const { count } = await this.sessionsService.cleanupExpiredSessions();

      this.logger.log(`Deleted ${count} EXPIRED sessions`);
    });
  }
}
