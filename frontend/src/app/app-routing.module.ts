import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { QblockQuestionComponent } from './components/qblock-question/qblock-question.component';
import { QblockComponent } from './components/qblock/qblock.component';

const routes: Routes = [
  {
    path: '',
    component: QblockComponent,
  },
  {
    path: "survey/:survey_name/:id",
    component: QblockQuestionComponent
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
