import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../user/user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(protected http: HttpClient) {}

  registerUser(user: User) {
    return this.http.post(environment.apiBaseUrl + "/register", user);
  }
}
