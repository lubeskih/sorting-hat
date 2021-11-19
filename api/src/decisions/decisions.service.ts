import { Injectable } from "@nestjs/common";
import { MatrixService } from "src/matrix/matrix.service";
import { UserService } from "src/user/user.service";

import * as tf from '@tensorflow/tfjs-node';
import { SurveyService } from "src/survey/survey.service";

@Injectable()
export class DecisionsService {
    constructor(private userService: UserService,
                private matrixService: MatrixService,
                private surveyService: SurveyService) {}
    
    async decision(userSessionToken: string) {
        const axis = 0; // columns

        const user = await this.userService.getUserBySessionToken(userSessionToken);
        const survey = await this.surveyService.singleSurvey(user.whichSurveyIsTaking.toString());

        await this.userService.userIsDoneWithSurvey({
            isDone: true,
            userId: user.id.toString(),
        })

        const scoreMatrix = await this.userService.getUserAnswerScores(userSessionToken);
        
        // tensor
        const tensorScoreMatrix = tf.tensor2d(scoreMatrix);
        const points = tensorScoreMatrix.sum(axis); // sum of the columns [300, 200, 100, 50]
        const pointsTotal = points.sum().toInt().dataSync()[0]
        
        const bias = await this.matrixService.getBias(survey.scoreMatrixId);

        // apply bias to the summed points
        const scoresWithBias = points.dataSync().map((p,i) => p + bias[i]);
        
        // calculate score
        let finalScores: number[] = [];

        scoresWithBias.forEach(score => {
            const x = 100 * (score/pointsTotal);
            finalScores.push(x);
        })

        return finalScores;
    }
}