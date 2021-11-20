import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HOUSES } from 'src/app/common/constants';
import { Decisions, Score } from 'src/app/common/types';
import { GET_SCORE } from 'src/app/graphql/graphql.queries';
import * as _ from "lodash";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  loading: boolean = false;
  error: any;
  result: boolean = true;
  userSessionToken: any;
  scores: Score[] = [];

  finalHouse: string = "";
  finalPoints: number = 0;
  finalPercent: string = "";

  constructor(private apollo: Apollo)  { }

  ngOnInit(): void {
    this.userSessionToken = sessionStorage.getItem("session");
    if (!this.userSessionToken) {
      this.loading = false;
      this.error = "No user session. Start the survey from the beginning."
      return;
    }

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
      const max = _.maxBy(decisions, (d) => d.points);
      if (max) {
        const index = _.findIndex(decisions, (i) => i.points === max.points);

        this.finalHouse = HOUSES[index];
        this.finalPercent = max.percent.toFixed(2);
        this.finalPoints = max.points
      }
    })

    // remove session
    sessionStorage.removeItem('session');
  }
}
