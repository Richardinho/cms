import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;

  public loggedInBus = new EventEmitter<boolean>();

  public logOut() {
    localStorage.removeItem('jwt_token');

    this.loggedInBus.emit(false);
  }

  public isLoggedIn() {
    return !!this.getToken();
  }

  public setToken(token) {
    localStorage.setItem('jwt_token', token);

    this.loggedInBus.emit(true);
  }

  public getToken() {
    return localStorage.getItem('jwt_token');
  }
}
