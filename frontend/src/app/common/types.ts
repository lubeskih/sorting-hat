export type Question = {
    answerChoice: string,
    value: string,
    id: string,
    lastQuestion: boolean,
    answers: {
        id: string,
        nextQuestionId: string,
        parentQuestionId: string,
        value: string
    }[]
  }
  
export type Decisions = {
    percent: number,
    points: number,
};

export type Score = {
    house: string,
    percent: string,
    points: number,
};
  