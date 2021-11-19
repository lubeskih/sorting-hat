import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from "@angular/material/radio";

import {HttpClientModule} from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { QblockComponent } from './components/qblock/qblock.component';
import { QblockQuestionComponent } from './components/qblock-question/qblock-question.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    QblockComponent,
    QblockQuestionComponent,
    PageNotFoundComponent
  ],
  imports: [
    MatButtonModule,
    MatRadioModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GraphQLModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
