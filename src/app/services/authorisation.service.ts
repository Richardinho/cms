import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface LoginResponseData {
  jwt_token: string;
}

@Injectable()
export class AuthorisationService {

  constructor(
    private http: HttpClient) {}

  logIn(username, password) {
    const formData = new FormData();
    const url = environment.blogDomain + '/index.php/api/login';

    formData.append('username', username);
    formData.append('password', password);

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });

    return this.http.post<LoginResponseData>(url, formData, { headers })
  }
}
