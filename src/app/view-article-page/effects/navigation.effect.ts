import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, mergeMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../../model';
import { Store, select } from '@ngrx/store';

import { navigateToEditPageRequest } from '../actions/navigate-to-edit-page-request';
import { selectId } from '../../edit-article-page/selectors/article.selector';

@Injectable()
export class NavigationEffects {
  navigateToEditPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(navigateToEditPageRequest),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectId)))
      )),
      tap(([action, articleId]) => {
        this.router.navigate(['/edit-article/' + articleId]);
      })
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
  ) {}
}

