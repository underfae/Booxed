import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './user/register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'register', component: UserComponent,
    children: [
      { path: '', component: RegisterComponent }
    ]
  },
  {
    path: '', redirectTo: '/register', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
