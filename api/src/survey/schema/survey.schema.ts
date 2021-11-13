import { Field, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const SurveyAnswer = new mongoose.Schema({
    answerId: String,
    value: String,
    selected: Boolean
});

export const SurveyQuestion = new mongoose.Schema({
    value: String,
    answerChoice: String,
    answers: [SurveyAnswer]
});

export const SurveySchema = new mongoose.Schema({
    surveyData: [SurveyQuestion]
});

// @ObjectType()
// export class Survey extends Document {
//   @Field()
//   answerId: string;

//   @Field()
//   answerChoice: string;
// };
