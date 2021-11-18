import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { GET_ALL_SURVEYS } from 'src/app/graphql/graphql.queries';

@Component({
  selector: 'app-qblock',
  templateUrl: './qblock.component.html',
  styleUrls: ['./qblock.component.scss']
})
export class QblockComponent implements OnInit {
  surveys: any[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_ALL_SURVEYS
    })
    .valueChanges.subscribe((result: any) => {
      this.surveys = result?.data?.allSurveys;
      this.loading = result.loading;
      this.error = result.error;
    });
  }

}
