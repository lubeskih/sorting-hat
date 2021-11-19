import { Module } from "@nestjs/common";

import { UserResolvers } from "./user.resolvers";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    providers: [UserResolvers, UserService, PrismaService],
    exports: [UserService],
})
export class UserModule {}