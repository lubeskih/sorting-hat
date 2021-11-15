import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { CreateAnswer, CreateQuestion, CreateSurvey } from "src/graphql";
import { SurveyService } from "./survey.service";

@Resolver("Survey")
export class SurveyResolvers {
    constructor(private readonly surveyService: SurveyService) {}
    
    // Survey
    @Mutation("createNewSurvey")
    async createNewSurvey(@Args('input') args: CreateSurvey) {
        return this.surveyService.createNewSurvey(args);
    }

    @Query("allSurveys")
    async allSurveys() {
        return this.surveyService.allSurveys();
    }

    @Query("singleSurvey")
    async singleSurvey(@Args('id') args: string) {
        return this.surveyService.singleSurvey(args);
    }

    // Question
    @Mutation("createNewQuestion")
    async createNewQuestion(@Args('input') args: CreateQuestion) {
        return this.surveyService.createNewQuestion(args);
    }

    @Query("allQuestions")
    async allQuestions(@Args('surveyId') args: string) {
        return this.surveyService.allQuestions(args);
    }

    @Query("singleQuestion")
    async singleQuestion(@Args('id') args: string) {
        return this.surveyService.singleQuestion(args);
    }

    // Answers
    @Mutation("createNewAnswer")
    async createNewAnswer(@Args('input') args: CreateAnswer) {
        return this.surveyService.createNewAnswer(args);
    }

    @Query("allAnswers")
    async allAnswers(@Args('questionId') args: string) {
        return this.surveyService.allAnswers(args);
    }

    @Query('singleAnswer')
    async singleAnswer(@Args('answerId') args: string) {
        return this.surveyService.singleAnswer(args);
    }
}