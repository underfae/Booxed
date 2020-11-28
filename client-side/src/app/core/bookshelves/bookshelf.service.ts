import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {environment} from "src/environments/environment";
import {Bookshelf} from "./bookshelf.model";
import {AddedBook} from "../books/book.model";

@Injectable({
  providedIn: 'root'
})
export class BookshelfService {

  constructor(protected http: HttpClient) {
  }

  addBookshelf(bookshelf: Bookshelf) {
    return this.http.post(environment.apiBaseUrl + "/bookshelf/create", bookshelf)
  }

  deleteBookshelf(id: string) {
    return this.http.delete(environment.apiBaseUrl + "/bookshelf/"+ id)
  }

  addBookToBookshelf(book:AddedBook, id: string) {
    return this.http.put(environment.apiBaseUrl + "/bookshelf/add/" + id, book)
  }

  getBookshelves(userId: string) {
    return this.http.get(environment.apiBaseUrl + "/bookshelves/"+ userId)
  }

  deleteBookFromBookshelf(id_book: string, id_bookshelf: string){
    return this.http.put(environment.apiBaseUrl + "/bookshelf/delete", {id_book: id_book, id_bookshelf: id_bookshelf})
  }
}
