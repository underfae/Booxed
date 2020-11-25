import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(protected http: HttpClient) { }

  getLibraries(){
    return this.http.get(environment.apiBaseUrl + "/libraries")
  }
}
