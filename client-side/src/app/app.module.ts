import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from "@angular/material/list";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';

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
import { OrdersDialogComponent } from './shared/components/orders-dialog/orders-dialog.component';
import { ReadonlyFieldComponent } from './shared/components/readonly-field/readonly-field.component';
import { CreateOrderDialogComponent } from './shared/components/create-order-dialog/create-order-dialog.component';
import { NoItemsFoundComponent } from './shared/components/no-items-found/no-items-found.component';
import { SearchComponent } from './search/search.component';
import { BookPreviewComponent } from './shared/components/book-preview/book-preview.component';
import {MatSelectModule} from "@angular/material/select";
import { BookComponent } from './book/book.component';
import { CommentsSectionComponent } from './shared/components/comments-section/comments-section.component';
import { LikedAndReadComponent } from './liked-and-read/liked-and-read.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AddToBookshelfDialogComponent } from './shared/components/add-to-bookshelf-dialog/add-to-bookshelf-dialog.component';
import { BookshelfDialogComponent } from './shared/components/bookshelf-dialog/bookshelf-dialog.component';

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
    PointsComponent,
    OrdersDialogComponent,
    ReadonlyFieldComponent,
    CreateOrderDialogComponent,
    NoItemsFoundComponent,
    SearchComponent,
    BookPreviewComponent,
    BookComponent,
    CommentsSectionComponent,
    LikedAndReadComponent,
    PageNotFoundComponent,
    AddToBookshelfDialogComponent,
    BookshelfDialogComponent
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
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressBarModule
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
