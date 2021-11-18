import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QblockQuestionComponent } from './components/qblock-question/qblock-question.component';

const routes: Routes = [
  {
    path: ":survey_title/:id", component: QblockQuestionComponent,
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
