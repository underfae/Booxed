import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(protected http: HttpClient) { }

  getWordOfTheDay(){
    return this.http.get(environment.apiBaseUrl + '/randomWord');
  }

}
