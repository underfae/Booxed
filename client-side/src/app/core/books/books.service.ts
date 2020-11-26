import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(protected http: HttpClient) { }

  getBooks(searchParam: string){
    return this.http.get("https://www.googleapis.com/books/v1/volumes?q=" + searchParam + "&key=" + environment.apiKey)
  }

  getBookById(id: string){
    return this.http.get("https://www.googleapis.com/books/v1/volumes/" + id + "?key=" + environment.apiKey)
  }
}
