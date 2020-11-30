import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

import {BooksService} from "../core/books/books.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  book: string = ''
  books: any[] = []

  constructor(
    protected booksService: BooksService,
    protected snackBar: MatSnackBar
  ) {
  }

  search = new FormGroup({
    book: new FormControl('')
  })

  clearSearchResult(): void {
    this.search.reset();
    this.books = [];
  }

  searchBooks(): void {
    this.book = this.search.value.book;
    if (this.book === '') {
      this.snackBar.open('You need to provide a book title or author name!', 'OK', {duration: 2000})
    } else {
      this.booksService.getBooks(this.book).subscribe((result: any) => {
        this.books = result.items
      })
    }
  }

}
