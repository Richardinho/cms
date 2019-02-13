import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

interface LoginResponseData {
  jwt_token: string
}

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  username = new FormControl('');
  password = new FormControl('');

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {}


  onSubmit() {
    const url = 'http://october.richardhunter.co.uk/index.php/api/login';

    const formData = new FormData();

    formData.append('username', this.username.value);
    formData.append('password', this.password.value);

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });

    this.http.post<LoginResponseData>(url, formData, { headers })
      .subscribe(token => {
        this.authService.setToken(token.jwt_token);

        this.router.navigate(['/home']);
      }, () => {
        console.log('error happened');
      });
  }
}
