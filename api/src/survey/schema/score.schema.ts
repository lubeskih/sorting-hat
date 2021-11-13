import { Field, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const ScoreSchema = new mongoose.Schema({
  answerId: String,
  score: [Number],
});

@ObjectType()
export class Score extends Document {
  @Field()
  answerId: string;

  @Field(() => [Number], {})
  score: number[];
}
