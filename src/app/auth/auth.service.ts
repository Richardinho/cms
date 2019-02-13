import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn() {
    return !!this.getToken();
  }

  public setToken(token) {
    localStorage.setItem('jwt_token', token);
  }

  public getToken() {
    return localStorage.getItem('jwt_token');
  }
}
