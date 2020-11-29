import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthenticationGuard} from "./user/auth/authentication.guard";
import {BookComponent} from "./book/book.component";
import {BookshelvesComponent} from './bookshelves/bookshelves.component'
import {DashboardComponent} from './dashboard/dashboard.component';
import {LikedAndReadComponent} from "./liked-and-read/liked-and-read.component";
import {LoginComponent} from './user/login/login.component';
import {MainpageComponent} from './mainpage/mainpage.component';
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";
import {PointsComponent} from './points/points.component';
import {RegisterComponent} from './user/register/register.component';
import {SearchComponent} from './search/search.component';
import {UserComponent} from './user/user.component';

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
    path: 'booxed', component: MainpageComponent, canActivate: [AuthenticationGuard],
    children: [
      {path: '', component: DashboardComponent},
      {path: 'bookshelves', component: BookshelvesComponent},
      {path: 'points', component: PointsComponent},
      {path: 'search', component: SearchComponent},
      {path: 'search/:id', component: BookComponent},
      {path: 'liked', component: LikedAndReadComponent},
      {path: 'read', component: LikedAndReadComponent}
    ]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
