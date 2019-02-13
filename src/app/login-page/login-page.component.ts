import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

interface LoginResponseData {
  jwt_token: string
}

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService) {}


  /*
   *  pass username and password to service
   *  if successful we navigate to home page (or else back to previous page that user was on)
   *  otherwise, we show an error to the user
   */
  onSubmit() {
    const url = 'http://october.richardhunter.co.uk/index.php/api/login';
    const username = 'Richardinho';
    const password = 'password';

    const formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });

    this.http.post<LoginResponseData>(url, formData, { headers })
      .subscribe(token => {
        this.authService.setToken(token.jwt_token);

        this.router.navigate(['/home']);
      });
  }
}
