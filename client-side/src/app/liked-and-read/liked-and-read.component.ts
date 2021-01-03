import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { PreviewBook } from '../core/books/book.model';
import { ModifiedUser, User } from '../core/user/user.model';
import { UserService } from '../core/user/user.service';

@Component({
  selector: 'app-liked-and-read',
  templateUrl: './liked-and-read.component.html',
  styleUrls: ['./liked-and-read.component.scss'],
})
export class LikedAndReadComponent implements OnInit {
  books: PreviewBook[] = [];
  mode: string;
  user: User;

  constructor(
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe((result: any) => {
      this.user = result.user;
      this.initBooks();
    });
  }

  initBooks(): void {
    let url = this.router.url;
    if (url === '/booxed/liked') {
      this.mode = 'liked';
      this.books = this.user.liked;
    } else if (url === '/booxed/read') {
      this.mode = 'read';
      this.books = this.user.read;
    } else {
      this.router.navigateByUrl('/booxed');
    }
  }

  deleteBook(id: string): void {
    let modifiedUser = new ModifiedUser();
    modifiedUser.id = this.user._id;
    modifiedUser.points = this.user.points;

    if (this.mode === 'liked') {
      modifiedUser.read = this.user.read;
      modifiedUser.liked = this.user.liked.filter(function (obj: PreviewBook) {
        return obj.id_book !== id;
      });
    } else if (this.mode === 'read') {
      modifiedUser.liked = this.user.liked;
      modifiedUser.read = this.user.read.filter(function (obj: PreviewBook) {
        return obj.id_book !== id;
      });
    }
    this.userService.modifyUser(modifiedUser).subscribe(
      () => {
        this.snackBar.open('List succesfully updated', 'OK', {
          duration: 2000,
        });
        this.books.splice(
          this.books.findIndex(function (i) {
            return i.id_book === id;
          }),
          1
        );
      },
      () => {
        this.snackBar.open('List could not be updated', 'OK', {
          duration: 4000,
        });
      }
    );
  }
}
