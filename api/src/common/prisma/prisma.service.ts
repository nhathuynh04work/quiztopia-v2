import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
import databaseConfiguration from "../../config/database.config";
import { type ConfigType } from "@nestjs/config";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(databaseConfiguration.KEY)
    private readonly databaseConfig: ConfigType<typeof databaseConfiguration>,
  ) {
    const adapter = new PrismaPg({
      connectionString: databaseConfig.url,
    });

    super({
      adapter,
      log: databaseConfig.logLevels,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
