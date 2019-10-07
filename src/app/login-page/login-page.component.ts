import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  /*
   *  model
   */

  public username: string = '';
  public password: string = '';

  errorMessage: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {}

  ngOnInit() {
    this.authService.logOut();

  }

  onSubmit() {
    const url = environment.blogDomain + '/index.php/api/login';

    const formData = new FormData();

    formData.append('username', this.username);
    formData.append('password', this.password);

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });

    this.http.post<LoginResponseData>(url, formData, { headers })
      .subscribe(token => {
        this.authService.setToken(token.jwt_token);
        const redirectUrl = this.route.snapshot.queryParamMap.get('afterLogin');

        if (redirectUrl) {
          this.router.navigate([redirectUrl]);
        } else {
          this.router.navigate(['/home']);
        }
      }, (e) => {
          this.errorMessage = 'Your submitted username and password were wrong';
      });
  }
}
