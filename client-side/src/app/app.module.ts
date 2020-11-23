import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from "@angular/material/list";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from '@angular/material/tooltip';

import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthenticationGuard} from "./user/auth/authentication.guard";
import {AuthenticationInterceptor} from "./user/auth/authentication.interceptor";
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './user/login/login.component';
import {MainpageComponent} from './mainpage/mainpage.component';
import {RegisterComponent} from './user/register/register.component';
import {UserComponent} from './user/user.component';
import {UserService} from './core/user/user.service';
import {BookshelvesComponent} from './bookshelves/bookshelves.component';
import {CreateBookshelfDialogComponent} from './shared/components/create-bookshelf-dialog/create-bookshelf-dialog.component';
import { PointsComponent } from './points/points.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MainpageComponent,
    RegisterComponent,
    UserComponent,
    BookshelvesComponent,
    CreateBookshelfDialogComponent,
    PointsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  },
    AuthenticationGuard,
    UserService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
