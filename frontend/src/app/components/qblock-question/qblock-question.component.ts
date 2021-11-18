import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { CREATE_NEW_USER_SESSION } from 'src/app/graphql/graphql.queries';

@Component({
  selector: 'app-qblock-question',
  templateUrl: './qblock-question.component.html',
  styleUrls: ['./qblock-question.component.scss']
})
export class QblockQuestionComponent implements OnInit {
  session: string = "";
  question: any = null;
  error: any;
  loading = true;

  constructor(private apollo: Apollo) { }

  createNewUserSession(surveyId: string, currentQuestionId: string) {
    this.apollo.mutate({
      mutation: CREATE_NEW_USER_SESSION,
      variables: {
        surveyId: surveyId,
        currentQuestionId: currentQuestionId
      }
    }).subscribe(( result: any) => {
      this.session = result?.data?.createNewUser.sessionToken;
      localStorage.setItem("session", this.session);
    })
  }

  ngOnInit(): void {
    if (!localStorage.getItem("session")) {
      console.log("no session, storing...");
      this.createNewUserSession("1", "1"); // [TODO]
    } else {
      console.log("session exists:", localStorage.getItem("session"));
    }
  }
}
