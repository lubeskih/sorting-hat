import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateScoreInput {
    @Field()
    answerId: string;

    @Field(() => [Number], {})
    score: number[];
}
