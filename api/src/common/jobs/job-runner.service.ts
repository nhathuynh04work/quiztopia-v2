import { Injectable } from "@nestjs/common";
import { PinoLogger } from "nestjs-pino";

@Injectable()
export class JobRunnerService {
  private readonly runningJobs = new Set<string>();

  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(JobRunnerService.name);
  }

  async run(jobName: string, operation: () => Promise<void>) {
    if (this.runningJobs.has(jobName)) {
      this.logger.warn(`[${jobName}] Skipped overlapping execution`);
      return;
    }

    this.runningJobs.add(jobName);

    const startedAt = Date.now();

    this.logger.info(`[${jobName}] Started`);

    try {
      await operation();

      this.logger.info(`[${jobName}] Finished in ${Date.now() - startedAt}ms`);
    } catch (err) {
      this.logger.error(
        `[${jobName}] Failed`,
        err instanceof Error ? err.stack : undefined,
      );

      throw err;
    } finally {
      this.runningJobs.delete(jobName);
    }
  }
}
