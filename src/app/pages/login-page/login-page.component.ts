import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState, Article } from '../../model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

import { environment } from '../../../environments/environment';

import { logInRequest } from '../../actions/log-in.action';

interface LoginResponseData {
  jwt_token: string;
}

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public username = '';
  public password = '';

  errorMessage: string = 'ss';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    //this.authService.logOut();
  }

  onSubmit() {
    const redirectUrl =
      this.route.snapshot.queryParamMap.get('afterLogin') || '/';

    this.store.dispatch(
      logInRequest({
        redirectUrl,
        username: this.username,
        password: this.password,
      })
    );
  }
}
