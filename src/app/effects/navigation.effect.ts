//  Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//  RXJS
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  tap,
  map,
  mergeMap,
  catchError,
  concatMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

//  models
import { AppState } from '../model';

//  actions
import { navigateToEditPageRequest } from '../actions';

//  selectors
import { selectId } from '../selectors/article.selector';

@Injectable()
export class NavigationEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router
  ) {}

  navigateToEditPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(navigateToEditPageRequest),
        concatMap((action) =>
          of(action).pipe(withLatestFrom(this.store.pipe(select(selectId))))
        ),
        tap(([action, articleId]) => {
          this.router.navigate(['/edit-article/' + articleId]);
        })
      ),
    { dispatch: false }
  );
}
