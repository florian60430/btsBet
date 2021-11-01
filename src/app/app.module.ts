import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnoncesComponent } from './annonces/annonces.component';


import { AnnonceService } from './annonces/services/annonce.service';
import { AuthComponent } from './auth/auth.component';
import { AnnonceViewComponent } from './annonce-view/annonce-view.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './annonces/services/auth.service';
import { SingleAnnonceComponent } from './single-annonce/single-annonce.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuard } from './annonces/services/auth-guard.service';
import { CreateComponent } from './create/create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './annonces/services/user.service';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { ParisService } from './annonces/services/paris.service';
import { GestionComponent } from './gestion/gestion.component';
import { GestionViewComponent } from './gestion-view/gestion-view.component';
import { ParisListComponent } from './paris-list/paris-list.component';
import { ParisComponent } from './paris/paris.component';
import { CreditsComponent } from './credits/credits.component';

const appRoutes: Routes = [
  { path: 'annonces',  canActivate: [AuthGuard], component: AnnonceViewComponent },
  { path: 'annonces/:id', canActivate: [AuthGuard], component: SingleAnnonceComponent },
  { path: 'mesParis', canActivate : [AuthGuard], component: ParisListComponent},
  { path: 'gestion', canActivate:  [AuthGuard], component: GestionViewComponent },
  { path: 'create', canActivate: [AuthGuard], component: CreateComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path : 'users', component: UserListComponent},
  { path: '', redirectTo: "annonces", pathMatch: "full"},
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found' }

];

@NgModule({
  declarations: [
    AppComponent,
    AnnoncesComponent,
    AuthComponent,
    AnnonceViewComponent,
    SingleAnnonceComponent,
    FourOhFourComponent,
    CreateComponent,
    UserListComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    GestionComponent,
    GestionViewComponent,
    ParisListComponent,
    ParisComponent,
    CreditsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [
    AnnonceService,
    AuthService,
    AuthGuard,
    UserService,
    ParisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
