import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CreateScoreInput } from "../dto/score.dto";
import { Score } from "../schema/score.schema";
import { SurveyService } from "../service/survey.service";

@Resolver(() => Score)
export class SurveyResolver {
    constructor(private surveyService: SurveyService) {}

    @Mutation(() => Score)
    async createScore(@Args("input") input: CreateScoreInput) {
        return this.surveyService.create(input);
    }

      @Query(() => [Score])
      async scores() {
        return this.surveyService.find();
      }
}