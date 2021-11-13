import { Inject, Injectable } from "@nestjs/common";
import { Score } from "../schema/score.schema";
import { Model, CreateQuery } from 'mongoose';

@Injectable()
export class SurveyService {
    constructor(
        @Inject("SCORE_MODEL")
        private scoreModel: Model<Score>
    ) {}

    async create(input: CreateQuery<Score>): Promise<Score> {
       return this.scoreModel.create(input);
    }

    async find(): Promise<Score[]> {
        return this.scoreModel.find().lean();
      }
}