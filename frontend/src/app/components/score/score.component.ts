import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_SCORE } from 'src/app/graphql/graphql.queries';

type Decisions = {
  percent: number,
  points: number,
};

type Score = {
  house: string,
  percent: string,
  points: number,
}

const HOUSES = ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"];

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  userSessionToken: string = "";
  scores: Score[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo, private route: ActivatedRoute) { 
    let session = localStorage.getItem("session");
    if (session) {
      this.userSessionToken = session;
    }

    this.route.params.subscribe((response: any) => {
      this.apollo.query<any>({
        query: GET_SCORE,
        variables: {
          userSessionToken: this.userSessionToken
        },
        fetchPolicy: 'network-only',
      }).subscribe((result: any) => {
        this.scores = [];
        this.loading = result?.loading;
  
        const decisions: Decisions[] = result?.data?.getDecision;
  
        HOUSES.map((house, index) => {
          this.scores.push({
            house: house,
            percent: decisions[index].percent.toFixed(2),
            points: decisions[index].points
          })
        })
      })
    }, (error: any) => {
      console.error("Error", error);
    })
  }

  ngOnInit(): void {
    // if (!localStorage.getItem("session")) {
    //   this.loading = false;
    //   this.error = "No session found. Refresh the page.";
    //   return;
    // };
  }
}
