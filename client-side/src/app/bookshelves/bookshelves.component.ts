import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateBookshelfDialogComponent} from "../shared/components/create-bookshelf-dialog/create-bookshelf-dialog.component";
import {Bookshelf} from "../core/bookshelves/bookshelf.model";
import {UserService} from "../core/user/user.service";
import {User} from "../core/user/user.model";

@Component({
  selector: 'app-bookshelves',
  templateUrl: './bookshelves.component.html',
  styleUrls: ['./bookshelves.component.scss']
})
export class BookshelvesComponent implements OnInit{

  bookshelves = [1, 2];
  name: string;
  description: string;
  addedBookshelf = new Bookshelf;
  user = new User;

  constructor(protected dialog: MatDialog, protected userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserData().subscribe((result: any) => {
        this.user = result.user;
      })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateBookshelfDialogComponent,{
      width: '400px',
      height: '400px',
      data: { name: this.name, description: this.description}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.addedBookshelf = result;
        this.addBookshelf()
      }
    });
  }

  addBookshelf() {
    this.addedBookshelf.books_amount = 0;
    this.addedBookshelf.creation_date = new Date();
    this.addedBookshelf.id_user = this.user._id;
    console.log(this.addedBookshelf)
  }

  deleteBookshelf(){}
}
