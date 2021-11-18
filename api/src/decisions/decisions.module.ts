import { Module } from "@nestjs/common";


import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { DecisionsResolvers } from "./decisions.resolvers";
import { DecisionsService } from "./decisions.service";

@Module({
    providers: [DecisionsResolvers, DecisionsService, PrismaService],
    imports: [UserService]
})
export class DecisionsModule {}