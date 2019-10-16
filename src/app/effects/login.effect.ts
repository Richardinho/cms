import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import { AppState } from '../model';
import { AuthorisationService } from '../services/authorisation.service';

import { unauthorisedResponse } from '../edit-article-page/actions/unauthorised-response.action';
import { logInRequest, logInResponse } from '../actions/log-in.action';
import { genericError } from '../edit-article-page/actions/generic-error.action';
import { logOut } from '../actions/log-in.action';

import { UNAUTHORIZED } from '../status-code.constants';

@Injectable()
export class LogInEffects {

  /*
   *  when the user clicks to log out we navigate back to home page
   */

  logOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logOut),
      tap(() => {
        this.router.navigate(['/login']);
      }),
    );
  }, { dispatch: false});

  /*
   *  if a user tries to access an api and aren't authorised, we direct them to the login page.
   */

  unauthorised$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unauthorisedResponse),
      tap(({ redirectUrl }) => {
        const navigationExtras = {
          queryParams : {
            afterLogin: redirectUrl }};

        this.router.navigate(['/login'], navigationExtras);
      })
    ), { dispatch: false });


  /*
   *  User has requested to login (from the login page).
   *  We contact the server. If they are authorised, we dispatch the loginresponse action. 
   *  otherwise, we dispatch an error action
   */

  logInRequest$ = createEffect(() => 
    this.actions$.pipe(
      ofType(logInRequest),
      switchMap(action => { 
        return this.authorisationService.logIn(action.username, action.password)
          .pipe(
            map(({ jwt_token }) => logInResponse({ redirectUrl: action.redirectUrl, jwt_token })),
            catchError((error) => {
              if (error.status) {
                if (error.status === UNAUTHORIZED) {
                  // actually, what this should signal that an error message should be displayed on the login page
                  return of(unauthorisedResponse({ redirectUrl: action.redirectUrl }));
                } else {
                  return of(genericError({ message: 'Server error occurred' }));
                }
              } else {
                return of(genericError({ message: 'Check your network' }));
              }
            })
          );
      })
    ));


  /*
   *  when a jwt token has came back from the server signalling that the use is logged in.
   *  We navigate back to where the user came from (or wherever else they want to go!)
   */

  logInResponse$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(logInResponse),
      tap((action) => this.router.navigate([action.redirectUrl])),
    )
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private router: Router,
    private authorisationService: AuthorisationService,
  ) {}
}
