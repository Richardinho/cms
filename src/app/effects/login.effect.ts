import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { tap, map, mergeMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import { unauthorisedResponse } from '../edit-article-page/actions/unauthorised-response.action';
import { AppState } from '../model';
import { Store, select } from '@ngrx/store';
import {
  UNAUTHORIZED,
  NOT_FOUND,
} from '../status-code.constants';

@Injectable()
export class LogInEffects {
  login = createEffect(() =>
    this.actions$.pipe(
      ofType(unauthorisedResponse),
      tap(({ redirectUrl }) => {
        const navigationExtras = {
          queryParams : {
            afterLogin: redirectUrl }};

        this.router.navigate(['/login'], navigationExtras);
      })
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}
}
