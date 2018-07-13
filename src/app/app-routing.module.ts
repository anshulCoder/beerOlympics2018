import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import { RegisterFormComponent } from './register-form/register-form.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const myRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterFormComponent},
  { path: 'thank_you', component: ThankYouComponent},
  { path: 'not-found', component: PageNotFoundComponent, data: {message: 'Page not found!'}},
  { path: '**', redirectTo: 'not-found'}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(myRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
