import { Field, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const AnswerWeight = new mongoose.Schema({
    answerId: String,
    score: [Number]
})

export const Matrix = new mongoose.Schema({
  surveyId: String,
  surveyMatrix: [AnswerWeight]
});

// graphql
@ObjectType()
export class GQLAnswerWeight extends Document {
  @Field()
  answerId: string;

  @Field(() => [Number])
  score: number[];
}

@ObjectType()
export class Score extends Document {
  @Field()
  answerId: string;

  @Field(() => [Number], {})
  score: number[];
}
