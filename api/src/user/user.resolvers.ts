import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { CreateUser, UpsertUserAnswer } from "src/graphql";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolvers {
    constructor(private readonly userService: UserService) {}

    // add new user
    @Mutation("createNewUser")
    async createNewUser(@Args('input') args: CreateUser) {
        return this.userService.createNewUser(args);
    }

    // add new user answer
    @Mutation("createNewUserAnswer")
    async createNewUserAnswer(@Args('input') args: UpsertUserAnswer) {
        return this.userService.createNewUserAnswer(args);
    }
}