import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BooksService} from "../core/books/books.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  books: any[] = []
  APIKEY: string = "AIzaSyCxuKSh4cSGVMwLVcnDtJEKYTlOpTe-dxo"
  book: string = ''

  constructor(protected booksService: BooksService) {
  }

  ngOnInit(): void {
  }

  search = new FormGroup({
    book: new FormControl('')
  })

  searchBooks() {
    this.book = this.search.value.book;
    this.booksService.getBooks(this.APIKEY, this.book).subscribe((result) => {
      console.log(result)
    })
  }

  handleInputChange() {

  }
}
