import { Resolver, Query, Args } from "@nestjs/graphql";
import { SurveyService } from "./survey.service";

@Resolver("Survey")
export class SurveyResolvers {
    constructor(private readonly surveyService: SurveyService) {}

    @Query("allSurveys")
    async allSurveys() {
        return this.surveyService.allSurveys();
    }

    @Query("singleSurvey")
    async singleSurvey(@Args('id') args: string) {
        return this.surveyService.singleSurvey(args);
    }

    @Query("allQuestions")
    async allQuestions(@Args('surveyId') args: string) {
        return this.surveyService.allQuestions(args);
    }

    @Query("singleQuestion")
    async singleQuestion(@Args('id') args: string) {
        return this.surveyService.singleQuestion(args);
    }

    @Query("allAnswers")
    async allAnswers(@Args('surveyId') args: string) {
        return this.surveyService.allAnswers(args);
    }

    @Query('singleAnswer')
    async singleAnswer(@Args('answerId') args: string) {
        return this.surveyService.singleAnswer(args);
    }
}