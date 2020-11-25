import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthenticationGuard} from "./user/auth/authentication.guard";
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './user/login/login.component';
import {MainpageComponent} from './mainpage/mainpage.component';
import {RegisterComponent} from './user/register/register.component';
import {BookshelvesComponent} from './bookshelves/bookshelves.component'
import {UserComponent} from './user/user.component';
import {PointsComponent} from './points/points.component';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {
    path: 'register', component: UserComponent,
    children: [
      {path: '', component: RegisterComponent}
    ]
  },
  {
    path: 'login', component: UserComponent,
    children: [
      {path: '', component: LoginComponent}
    ]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'mainPage', component: MainpageComponent, canActivate: [AuthenticationGuard],
    children: [
      {path: '', component: DashboardComponent},
      {path: 'bookshelves', component: BookshelvesComponent},
      {path: 'points', component: PointsComponent},
      {path: 'search', component: SearchComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
