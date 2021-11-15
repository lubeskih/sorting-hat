
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUser {
    whichSurveyIsTaking: string;
}

export class UpdateUserAnswer {
    answerId: string;
    selected: boolean;
}

export class UserIsDoneWithSurvey {
    isDone: boolean;
}

export class CreateMatrix {
    surveyTitle: string;
}

export class CreateSurvey {
    surveyTitle: string;
    scoreMatrixId: string;
}

export class CreateQuestion {
    value: string;
    answerChoice: string;
    parentSurveyId: string;
}

export class CreateAnswer {
    value: string;
    parentQuestionId: string;
    nextQuestionId: string;
}

export class CreateAnswerScore {
    scoreArray: string;
    matrixId: string;
    answerId: string;
}

export class CreateUserAnswer {
    selected: boolean;
    answerId: string;
    userId: string;
}

export class Survey {
    id: string;
    surveyTitle: string;
    questions?: Nullable<Nullable<Question>[]>;
}

export class Question {
    id: string;
    value: string;
    answerChoice: string;
    parentSurveyId: string;
    answers?: Nullable<Nullable<Answer>[]>;
}

export class Answer {
    id: string;
    value: string;
    parentQuestionId: string;
    nextQuestionId: string;
}

export class Matrix {
    id: string;
    surveyTitle?: Nullable<string>;
    survey?: Nullable<string>;
    score?: Nullable<Nullable<Score>[]>;
}

export class Score {
    id: string;
    scoreArray: string;
    matrixId: string;
    answerId: string;
}

export class User {
    id: string;
    createdAt: string;
    whichSurveyIsTaking: string;
    currentQuestionId: string;
    userAnswers?: Nullable<Nullable<UserAnswer>[]>;
}

export class UserAnswer {
    id: string;
    selected: boolean;
    answerId: string;
    userId: string;
}

export abstract class IQuery {
    abstract allSurveys(): Survey[] | Promise<Survey[]>;

    abstract singleSurvey(id: string): Nullable<Survey> | Promise<Nullable<Survey>>;

    abstract allQuestions(surveyId: string): Question[] | Promise<Question[]>;

    abstract singleQuestion(questionId: string): Nullable<Question> | Promise<Nullable<Question>>;

    abstract allAnswers(questionId: string): Answer[] | Promise<Answer[]>;

    abstract singleAnswer(answerId: string): Nullable<Answer> | Promise<Nullable<Answer>>;

    abstract user(userId: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createNewMatrix(input?: Nullable<CreateMatrix>): Matrix | Promise<Matrix>;

    abstract createNewSurvey(input?: Nullable<CreateSurvey>): Survey | Promise<Survey>;

    abstract createNewQuestion(input?: Nullable<CreateQuestion>): Question | Promise<Question>;

    abstract createNewAnswer(input?: Nullable<CreateAnswer>): Question | Promise<Question>;

    abstract createNewAnswerScore(input?: Nullable<CreateAnswerScore>): Score | Promise<Score>;

    abstract createNewUser(input?: Nullable<CreateUser>): User | Promise<User>;

    abstract selectAnswer(input?: Nullable<UpdateUserAnswer>): UserAnswer | Promise<UserAnswer>;

    abstract userIsDone(input?: Nullable<UserIsDoneWithSurvey>): User | Promise<User>;

    abstract createNewUserAnswer(input?: Nullable<CreateUserAnswer>): Answer | Promise<Answer>;
}

type Nullable<T> = T | null;
