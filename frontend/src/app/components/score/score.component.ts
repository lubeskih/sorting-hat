import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { HOUSES } from 'src/app/common/constants';
import { Decisions, Score } from 'src/app/common/types';
import { GET_SCORE } from 'src/app/graphql/graphql.queries';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  userSessionToken: any = "";
  scores: Score[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo, private route: ActivatedRoute) { 
    this.route.params.subscribe((response: any) => {
      this.userSessionToken = sessionStorage.getItem("session");

      this.apollo.query<any>({
        query: GET_SCORE,
        variables: {
          userSessionToken: this.userSessionToken
        },
        fetchPolicy: 'network-only',
      }).subscribe((result: any) => {
        console.log("YESSSSSSSSSSS!");
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
  }
}
