import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BooksService} from "../core/books/books.service";
import {UserService} from "../core/user/user.service";
import {ModifiedUser, User} from "../core/user/user.model";
import {AddedBook} from "../core/books/book.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateBookshelfDialogComponent} from "../shared/components/create-bookshelf-dialog/create-bookshelf-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddToBookshelfDialogComponent} from "../shared/components/add-to-bookshelf-dialog/add-to-bookshelf-dialog.component";
import {Bookshelf} from "../core/bookshelves/bookshelf.model";
import {BookshelfService} from "../core/bookshelves/bookshelf.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  book: any;
  id: string;
  user: User;

  constructor(private route: ActivatedRoute,
              protected booksService: BooksService,
              protected userService: UserService,
              protected snackBar: MatSnackBar,
              protected dialog: MatDialog,
              protected bookshelfService: BookshelfService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if (this.id) {
      this.booksService.getBookById(this.id).subscribe((result: any) => {
        this.book = result
      })
    }
    this.userService.getUserData().subscribe((result: any) => {
      this.user = result.user
    })
  }

  getRatingValue(value) {
    return (value / 5.0) * 100;
  }

  checkIfLikedOrRead(checkValue: string): boolean {

    if(this.book){
      if (checkValue === 'liked') {
        return this.user?.liked?.some(x => x.id_book === this.book?.id);
      } else if (checkValue === 'read') {
        return this.user?.read?.some(x => x.id_book === this.book?.id);
      }
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(AddToBookshelfDialogComponent, {
      width: '400px',
      height: '400px',
      data: {id: [], id_user: this.user._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addToBookshelf(result)
      }
    });
  }

  addToBookshelf(id: string[]){
    id.forEach((id:string)=> {
      let addedBook = new AddedBook;
      addedBook.id_book = this.book?.id;
      addedBook.image = this.book.volumeInfo.imageLinks.smallThumbnail;
      addedBook.authors =this.book.volumeInfo.authors;
      addedBook.title = this.book.volumeInfo.title;
      this.bookshelfService.addBookToBookshelf(addedBook, id).subscribe(
        ((result:any)=>{
          console.log(result)
        })
      )
    });
  }

  addToLikedOrRead(action: string) {
    const modifiedUser = new ModifiedUser;
    const newBook = new AddedBook;

    newBook.id_book = this.book?.id
    newBook.authors = this.book?.volumeInfo?.authors
    newBook.title = this.book?.volumeInfo?.title
    newBook.image = this.book?.volumeInfo?.imageLinks?.smallThumbnail

    modifiedUser.points = this.user.points
    modifiedUser.id = this.user._id
    modifiedUser.liked = this.user.liked
    modifiedUser.read = this.user.read

    if (action === 'liked') {
      modifiedUser.liked.push(newBook)
    } else if (action === 'read') {
      modifiedUser.read.push(newBook)
    }
    this.userService.modifyUser(modifiedUser).subscribe(
      () => {
        this.snackBar.open('List succesfully updated', 'OK', {duration: 2000});
      },
      () => {
        this.snackBar.open('List could not be updated', 'OK', {duration: 4000});
      }
    )

  }
}
