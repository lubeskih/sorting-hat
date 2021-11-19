import { Resolver, Query, Args } from "@nestjs/graphql";
import { DecisionsService } from "./decisions.service";
import { GetDecision } from "src/graphql"

@Resolver("Decisions")
export class DecisionsResolvers {
    constructor(private readonly decisionsService: DecisionsService) {}

    @Query("getDecision")
    async decision(@Args('input') args: GetDecision) {
        return this.decisionsService.decision(args.userSessionToken);
    }
}