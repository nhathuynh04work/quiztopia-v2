import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class JobRunnerService {
  private readonly logger = new Logger(JobRunnerService.name);
  private readonly runningJobs = new Set<string>();

  async run(jobName: string, operation: () => Promise<void>) {
    if (this.runningJobs.has(jobName)) {
      this.logger.warn(`[${jobName}] Skipped overlapping execution`);
      return;
    }

    this.runningJobs.add(jobName);

    const startedAt = Date.now();

    this.logger.log(`[${jobName}] Started`);

    try {
      await operation();

      this.logger.log(`[${jobName}] Finished in ${Date.now() - startedAt}ms`);
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
