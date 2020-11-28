import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BooksService} from "../core/books/books.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  books: any[] = []
  book: string = ''

  constructor(protected booksService: BooksService, protected snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  search = new FormGroup({
    book: new FormControl('')
  })

  searchBooks() {
    this.book = this.search.value.book;
    if (this.book === '') {
      this.snackBar.open('You need to provide a book title or author name!', 'OK', {duration: 2000})
    } else {
      this.booksService.getBooks(this.book).subscribe((result: any) => {
        this.books = result.items
      })
    }
  }

  clearSearchResult() {
    this.search.reset();
    this.books = [];
  }

}
