import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { environment } from '../../environments/environment';

interface LoginResponseData {
  jwt_token: string
}

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  username = new FormControl('');
  password = new FormControl('');

  errorMessage: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit() {
    this.authService.logOut();
  }

  onSubmit() {
    const url = environment.blogDomain + '/index.php/api/login';

    const formData = new FormData();

    formData.append('username', this.username.value);
    formData.append('password', this.password.value);

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });

    this.http.post<LoginResponseData>(url, formData, { headers })
      .subscribe(token => {
        this.authService.setToken(token.jwt_token);

        if (this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl]);
        } else {
          this.router.navigate(['/home']);
        }
      }, (e) => {
        if (e.status === 403) {
          this.errorMessage = 'Your submitted username and password were wrong';
        } else {
          this.errorMessage = 'Some other error occurred';
        }
      });
  }
}
