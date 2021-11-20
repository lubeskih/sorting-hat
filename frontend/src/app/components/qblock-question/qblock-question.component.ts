import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { ActivatedRoute, Router } from '@angular/router';
import { CREATE_NEW_USER_SESSION, GET_QUESTION, GET_SCORE, SUBMIT_USER_ANSWER } from 'src/app/graphql/graphql.queries';

type Question = {
  answerChoice: string,
  value: string,
  id: string,
  answers: {
    id: string,
    nextQuestionId: string,
    parentQuestionId: string,
    value: string
  }[]
}

@Component({
  selector: 'app-qblock-question',
  templateUrl: './qblock-question.component.html',
  styleUrls: ['./qblock-question.component.scss']
})
export class QblockQuestionComponent implements OnInit {
  question: Question | null = null;

  error: any;
  loading = true;

  surveyId: string = "";
  surveyQuestionId: string = "";

  answerSelected = false;
  selectedAnswerId: number = 0;

  userSessionToken: string = "";
  isLastQuestion: boolean = false;

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((response: any) => {
      this.surveyId = response.survey_name;
      this.surveyQuestionId = response.id;

      this.renderQuestion();
    }, (error: any) => {
      console.error("Error", error);
    })
  }

  onPreviousPage(event: any) {
  }

  onNextPage(event: any) {
    let nextQuestionId: number;
    let userSessionToken = localStorage.getItem("session");

    this.apollo.mutate({
      mutation: SUBMIT_USER_ANSWER,
      variables: {
        selected: this.answerSelected,
        answerId: this.selectedAnswerId,
        questionId: this.surveyQuestionId,
        userSessionToken: userSessionToken,
      }
    }).subscribe((result: any) => {
      nextQuestionId = result?.data?.createNewUserAnswer.nextQuestionId;

      if (!this.isLastQuestion) {
        this.router.navigate([`/survey/${this.surveyId}/${nextQuestionId}`])
      }
    })
  }

  radioChange(event: any) {
    this.selectedAnswerId = event.value;
    this.answerSelected = true;
  }

  createNewUserSession(surveyId: string, currentQuestionId: string) {
    if (localStorage.getItem("session")) return;
    
    this.apollo.mutate({
      mutation: CREATE_NEW_USER_SESSION,
      variables: {
        surveyId: surveyId,
        currentQuestionId: currentQuestionId
      }
    }).subscribe((result: any) => {
      const session = result?.data?.createNewUser.sessionToken;
      localStorage.setItem("session", session);
    })
  }

  renderQuestion() {
    this.apollo.query({
      query: GET_QUESTION,
      variables: {
        questionId: this.surveyQuestionId
      }
    }).subscribe((result: any) => {
      const q = result?.data?.singleQuestion;

      this.loading = result?.loading;

      if (!q) {
        this.error = "No question found."
        return;
      }

      this.question = {
        answerChoice: q.answerChoice,
        id: q.id,
        value: q.value,
        answers: q.answers.map((answer: any) => ({
          id: answer.id,
          nextQuestionId: answer.nextQuestionId,
          parentQuestionId: answer.parentQuestionId,
          value: answer.value
        }))
      }
    })
  }

  ngOnInit(): void {
      this.createNewUserSession("1", "1"); // [TODO]
  }
}
