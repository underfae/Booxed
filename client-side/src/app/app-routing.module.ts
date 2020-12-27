import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './user/auth/authentication.guard';
import { BookComponent } from './book/book.component';
import { BookshelvesComponent } from './bookshelves/bookshelves.component';
import { CommentsComponent } from './admin/comments/comments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LibrariesComponent } from './admin/libraries/libraries.component';
import { LikedAndReadComponent } from './liked-and-read/liked-and-read.component';
import { LoginComponent } from './user/login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { PointsComponent } from './points/points.component';
import { RegisterComponent } from './user/register/register.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { RewardsComponent } from './admin/rewards/rewards.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './admin/users/users.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'password',
    component: UserComponent,
    children: [
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password/:token', component: ResetPasswordComponent },
    ],
  },
  {
    path: 'register',
    component: UserComponent,
    children: [{ path: '', component: RegisterComponent }],
  },
  {
    path: 'login',
    component: UserComponent,
    children: [{ path: '', component: LoginComponent }],
  },
  {
    path: 'resetPassword',
    component: UserComponent,
    children: [{ path: '', component: ResetPasswordComponent }],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'booxed',
    component: MainpageComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'bookshelves', component: BookshelvesComponent },
      { path: 'points', component: PointsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'search/:id', component: BookComponent },
      { path: 'liked', component: LikedAndReadComponent },
      { path: 'read', component: LikedAndReadComponent },
      { path: 'users', component: UsersComponent },
      { path: 'rewards', component: RewardsComponent },
      { path: 'libraries', component: LibrariesComponent },
      { path: 'comments', component: CommentsComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
