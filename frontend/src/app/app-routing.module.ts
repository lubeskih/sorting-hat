import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QblockQuestionComponent } from './components/qblock-question/qblock-question.component';
import { QblockComponent } from './components/qblock/qblock.component';
import { ResultsComponent } from './components/results/results.component';
import { ScoreComponent } from './components/score/score.component';

const routes: Routes = [
  {
    path: '',
    component: QblockComponent,
  },
  {
    path: 'survey/:survey_name/:id',
    children: [
      {
        path: '',
        component: QblockQuestionComponent,
      },
      {
        path: '',
        component: ScoreComponent,
        outlet: 'score'
      },
      {
        path: 'results',
        component: ResultsComponent,
      },
    ]
  },
  { 
    path: '**', component: PageNotFoundComponent  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
