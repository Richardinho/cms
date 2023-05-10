//  Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//  RXJS
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
  switchMap,
  tap,
  map,
  catchError,
  concatMap,
  withLatestFrom,
} from 'rxjs/operators';

//  models
import { AppState } from '../model';

//  services
import { ArticleService } from '../services/article.service';

//  actions
import { unauthorisedResponse, genericError } from '../actions';
import { createArticleRequest, createArticleResponse } from '../actions';

//  selectors
import { selectJWTToken } from '../selectors/article.selector';

//  utils
import { UNAUTHORIZED } from '../status-code.constants';

@Injectable()
export class CreateArticleEffects {
  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  navigateToEditPage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createArticleResponse),
        tap(({ id }) => {
          this.router.navigate(['/edit-article', id]);
        })
      );
    },
    { dispatch: false }
  );

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleRequest),
      withLatestFrom(this.store.pipe(select(selectJWTToken))),
      switchMap(([action, token]) => {
        return this.articleService.createArticle(token).pipe(
          map((id) => createArticleResponse({ id })),
          catchError((error) => {
            if (error.status) {
              if (error.status === UNAUTHORIZED) {
                return of(
                  unauthorisedResponse({ redirectUrl: '/article-list' })
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
}
