import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AddedBook} from "../core/books/book.model";
import {UserService} from "../core/user/user.service";
import {ModifiedUser, User} from "../core/user/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-liked-and-read',
  templateUrl: './liked-and-read.component.html',
  styleUrls: ['./liked-and-read.component.scss']
})
export class LikedAndReadComponent implements OnInit {

  books: AddedBook[] = []
  user: User
  mode: string

  constructor(protected router: Router, protected userService: UserService, protected snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe((result: any) => {
      this.user = result.user
      this.initBooks()
    })
  }

  initBooks() {
    let url = this.router.url
    if (url === '/booxed/liked') {
      this.mode = 'liked'
      this.books = this.user.liked
    } else if (url === '/booxed/read') {
      this.mode = 'read'
      this.books = this.user.read
    } else {
      this.router.navigateByUrl('/booxed')
    }
  }

  deleteBook(id: string) {
    let modifiedUser = new ModifiedUser
    modifiedUser.id = this.user._id;
    modifiedUser.points = this.user.points;

    if (this.mode === 'liked') {
      modifiedUser.read = this.user.read;
      modifiedUser.liked = this.user.liked.filter(function (obj: AddedBook) {
        return obj.id_book !== id;
      });
    } else if (this.mode === 'read') {
      modifiedUser.liked = this.user.liked;
      modifiedUser.read = this.user.read.filter(function (obj: AddedBook) {
        return obj.id_book !== id;
      });
    }
      this.userService.modifyUser(modifiedUser).subscribe(
        () => {
          this.snackBar.open('List succesfully updated', 'OK', {duration: 2000});
          this.books.splice(this.books.findIndex(function (i) {
            return i.id_book === id;
          }), 1);
        },
        () => {
          this.snackBar.open('List could not be updated', 'OK', {duration: 4000});
        })
    }
}
