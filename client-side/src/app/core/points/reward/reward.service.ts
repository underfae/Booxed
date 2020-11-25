import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  constructor(protected http: HttpClient) { }

  getRewards(){
    return this.http.get(environment.apiBaseUrl + "/rewards")
  }
}
