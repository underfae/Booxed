import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { LoggedUser, ModifiedUser, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(protected http: HttpClient) {}

  noAuth = { headers: new HttpHeaders({ NoAuth: 'True' }) };

  registerUser(user: User) {
    return this.http.post(
      environment.apiBaseUrl + '/register',
      user,
      this.noAuth
    );
  }

  loginUser(user: LoggedUser) {
    return this.http.post(
      environment.apiBaseUrl + '/authenticate',
      user,
      this.noAuth
    );
  }

  getUserData() {
    return this.http.get(environment.apiBaseUrl + '/loggedUser');
  }

  setUserToken(token: string) {
    localStorage.setItem('token', token);
  }

  getUserToken() {
    return localStorage.getItem('token');
  }

  deleteUserToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getUserToken();
    if (token) {
      const payload = atob(token.split('.')[1]);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  isUserLogged() {
    const payload = this.getUserPayload();
    if (payload) {
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  modifyUser(modifiedUser: ModifiedUser) {
    return this.http.put(
      environment.apiBaseUrl + '/modifyUser/' + modifiedUser.id,
      modifiedUser
    );
  }

  getUser(id_user: string) {
    return this.http.get(environment.apiBaseUrl + '/user/' + id_user);
  }

  getAllUsers() {
    return this.http.get(environment.apiBaseUrl + '/users');
  }

  deleteUser(user_id: string) {
    return this.http.delete(environment.apiBaseUrl + '/user/' + user_id);
  }

  forgotPassword(email: string) {
    return this.http.put(environment.apiBaseUrl + '/forgot-password/', {
      email: email,
    });
  }

  changePassword(newPass: string, resetLink: string) {
    return this.http.put(environment.apiBaseUrl + '/reset-password/', {
      resetLink: resetLink,
      newPass: newPass,
    });
  }

  sendMessage(email: string, subject: string, text: string) {
    return this.http.put(environment.apiBaseUrl + '/send-message', {
      email: email,
      subject: subject,
      text: text,
    });
  }
}
