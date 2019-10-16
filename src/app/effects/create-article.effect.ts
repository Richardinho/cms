import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { switchMap, tap, map, mergeMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../model';

import { ArticleService } from '../article.service';

//  need to fix a lot of these imports
import { articleRequest } from '../edit-article-page/actions/edit-article-request.action';
import { getArticleResponse } from '../edit-article-page/actions/get-article-response.action';
import { articleFoundInCache } from '../edit-article-page/actions/article-found-in-cache.action';
import { unauthorisedResponse } from '../edit-article-page/actions/unauthorised-response.action';
import { genericError } from '../edit-article-page/actions/generic-error.action';

import { selectJWTToken } from '../edit-article-page/selectors/article.selector';
import { createArticleRequest, createArticleResponse } from '../actions/create-article.action';

import {
  UNAUTHORIZED,
  NOT_FOUND,
} from '../status-code.constants';

@Injectable()
export class CreateArticleEffects {

  navigateToEditPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createArticleResponse),
      tap(({id}) => {
        this.router.navigate(['/edit-article', id]);
      })
    );
  }, { dispatch: false });

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createArticleRequest),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectJWTToken)))
      )),
      switchMap(([action, token]) => {
        return this.articleService.createArticle(token)
          .pipe(
            map((id) => createArticleResponse({ id })),
            catchError((error) => {
              if (error.status) {
                //  if we are unauthorised, we will dispatch an unauthorised response which results
                //  in redirection to login page
                if (error.status === UNAUTHORIZED) {
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

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private store: Store<AppState>,
    private router: Router,
  ) {}
}

