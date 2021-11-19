import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { ActivatedRoute } from '@angular/router';
import { CREATE_NEW_USER_SESSION, GET_QUESTION } from 'src/app/graphql/graphql.queries';

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


  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    this.route.params.subscribe((response: any) => {
      this.surveyId = response.survey_name;
      this.surveyQuestionId = response.id;
    }, (error: any) => {
      console.error("Error", error);
    })
  }

  createNewUserSession(surveyId: string, currentQuestionId: string) {
    if (localStorage.getItem("session")) return;
    
    this.apollo.mutate({
      mutation: CREATE_NEW_USER_SESSION,
      variables: {
        surveyId: surveyId,
        currentQuestionId: currentQuestionId
      }
    }).subscribe(( result: any) => {
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
      console.log(result)
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
      this.renderQuestion();
  }
}
