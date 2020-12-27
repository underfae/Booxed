import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { NgModule } from '@angular/core';

import { AddToBookshelfDialogComponent } from './shared/components/add-to-bookshelf-dialog/add-to-bookshelf-dialog.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationGuard } from './user/auth/authentication.guard';
import { AuthenticationInterceptor } from './user/auth/authentication.interceptor';
import { BookComponent } from './book/book.component';
import { BookPreviewComponent } from './shared/components/book-preview/book-preview.component';
import { BookshelfDialogComponent } from './shared/components/bookshelf-dialog/bookshelf-dialog.component';
import { BookshelvesComponent } from './bookshelves/bookshelves.component';
import { CommentsSectionComponent } from './shared/components/comments-section/comments-section.component';
import { CreateBookshelfDialogComponent } from './shared/components/create-bookshelf-dialog/create-bookshelf-dialog.component';
import { CreateOrderDialogComponent } from './shared/components/create-order-dialog/create-order-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LikedAndReadComponent } from './liked-and-read/liked-and-read.component';
import { LoginComponent } from './user/login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { NoItemsFoundComponent } from './shared/components/no-items-found/no-items-found.component';
import { OrdersDialogComponent } from './shared/components/orders-dialog/orders-dialog.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { PointsComponent } from './points/points.component';
import { RegisterComponent } from './user/register/register.component';
import { ReadonlyFieldComponent } from './shared/components/readonly-field/readonly-field.component';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { UserService } from './core/user/user.service';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { UsersComponent } from './admin/users/users.component';
import { LibrariesComponent } from './admin/libraries/libraries.component';
import { RewardsComponent } from './admin/rewards/rewards.component';
import { CommentsComponent } from './admin/comments/comments.component';
import { AddLibraryComponent } from './shared/components/add-library/add-library.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { SendMessageDialogComponent } from './shared/components/send-message-dialog/send-message-dialog.component';

@NgModule({
  declarations: [
    AddToBookshelfDialogComponent,
    AppComponent,
    BookComponent,
    BookPreviewComponent,
    BookshelfDialogComponent,
    BookshelvesComponent,
    CommentsSectionComponent,
    CreateBookshelfDialogComponent,
    CreateOrderDialogComponent,
    DashboardComponent,
    LikedAndReadComponent,
    LoginComponent,
    MainpageComponent,
    NoItemsFoundComponent,
    OrdersDialogComponent,
    PageNotFoundComponent,
    PointsComponent,
    RegisterComponent,
    ReadonlyFieldComponent,
    SearchComponent,
    UserComponent,
    ResetPasswordComponent,
    UsersComponent,
    LibrariesComponent,
    RewardsComponent,
    CommentsComponent,
    AddLibraryComponent,
    ForgotPasswordComponent,
    SendMessageDialogComponent,
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
    MatProgressBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    AuthenticationGuard,
    UserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
