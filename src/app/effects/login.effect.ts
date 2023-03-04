import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import { AppState } from '../model';
import { AuthorisationService } from '../services/authorisation.service';

import { genericError } from '../actions/generic-error.action';
import { logInRequest, logInResponse } from '../actions/log-in.action';
import { logOut } from '../actions/log-in.action';
import { sessionExpired } from '../actions/session-expired.action';
import { unauthorisedResponse } from '../actions/unauthorised-response.action';

import { UNAUTHORIZED } from '../status-code.constants';

@Injectable()
export class LogInEffects {
  /*
   *  when the user clicks to log out we navigate back to home page
   */

  logOut$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logOut),
        tap(() => {
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );

  /*
   *  if a user tries to access an api and aren't authorised, we direct them to the login page.
   */

  unauthorised$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(unauthorisedResponse),
        tap(({ redirectUrl }) => {
          const navigationExtras = {
            queryParams: {
              afterLogin: redirectUrl,
            },
          };

          this.router.navigate(['/login'], navigationExtras);
        })
      ),
    { dispatch: false }
  );

  /*
   *  User has requested to login (from the login page).
   *  We contact the server. If they are authorised, we dispatch the loginresponse action.
   *  otherwise, we dispatch an error action
   */

  logInRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logInRequest),
      switchMap((action) => {
        console.log('log in request');
        return this.authorisationService
          .logIn(action.username, action.password)
          .pipe(
            map(({ jwt_token }) =>
              logInResponse({ redirectUrl: action.redirectUrl, jwt_token })
            ),
            catchError((error) => {
              if (error.status) {
                if (error.status === UNAUTHORIZED) {
                  // actually, what this should signal that an error message should be displayed on the login page
                  return of(
                    unauthorisedResponse({ redirectUrl: action.redirectUrl })
                  );
                } else {
                  return of(genericError({ message: 'Server error occurred' }));
                }
              } else {
                return of(genericError({ message: 'Check your network' }));
              }
            })
          );
      })
    )
  );

  /*
   *  when a jwt token has came back from the server signalling that the use is logged in.
   *  We navigate back to where the user came from (or wherever else they want to go!)
   */

  logInResponse$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logInResponse),
        tap((action) => {
          const token = action.jwt_token;
          const segments = token.split('.');
          const payload = JSON.parse(atob(segments[1]));
          const expiry = payload.exp * 1000;
          const currentTime = new Date().valueOf();

          setTimeout(() => {
            this.store.dispatch(sessionExpired());
            alert(
              'Your log-in session has expired. You will have to log in before saving anything to the server'
            );
          }, expiry - currentTime);

          this.router.navigate([action.redirectUrl]);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private authorisationService: AuthorisationService
  ) {}
}
