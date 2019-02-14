import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;

  public isLoggedIn() {
    return !!this.getToken();
  }

  public logOut() {
    localStorage.removeItem('jwt_token');
  }

  public setToken(token) {
    localStorage.setItem('jwt_token', token);
  }

  public getToken() {
    return localStorage.getItem('jwt_token');
  }
}
