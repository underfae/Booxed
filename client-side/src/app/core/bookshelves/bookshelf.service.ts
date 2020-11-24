import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {environment} from "src/environments/environment";
import {Bookshelf} from "./bookshelf.model";

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

  getBookshelf() {
  }

  getBookshelves(userId: string) {
    return this.http.get(environment.apiBaseUrl + "/bookshelves/"+ userId)
  }
}
