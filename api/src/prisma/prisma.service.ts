// connect to Prisma client

import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    // connect to prisma client
    // (it holds the db conn)
    async onModuleInit() {
        await this.$connect();
    }

    // close down conn with beforeExit event listener
    async enableShutdownHooks(app: INestApplication) {
        this.$on("beforeExit", async() => {
            await app.close();
        })
    }
}