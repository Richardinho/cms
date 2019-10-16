import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../model';

import { ArticleService } from '../article.service';

import { articleRequest } from '../edit-article-page/actions/edit-article-request.action';
import { getArticleResponse } from '../edit-article-page/actions/get-article-response.action';
import { articleFoundInCache } from '../edit-article-page/actions/article-found-in-cache.action';
import { unauthorisedResponse } from '../edit-article-page/actions/unauthorised-response.action';
import { genericError } from '../edit-article-page/actions/generic-error.action';

import { selectArticleWithToken } from '../edit-article-page/selectors/article.selector';

import { UNAUTHORIZED } from '../status-code.constants';

@Injectable()
export class GetArticleEffects {

  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleRequest),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectArticleWithToken, { id : action.id })))
      )),
      switchMap(([action, article]) => {
        if (article.article) {
          return of(articleFoundInCache({id: action.id}));
        }

        return this.articleService.getArticle(action.id, article.token)
          .pipe(
            map((articleJSON) => getArticleResponse({ articleJSON })),
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
  ) {}
}

