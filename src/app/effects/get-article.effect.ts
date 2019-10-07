import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../article';

import { ArticleService } from '../article.service';

import { editArticleRequest }   from '../edit-article-page/actions/edit-article-request.action';
import { getArticleResponse }   from '../edit-article-page/actions/get-article-response.action';
import { articleFoundInCache }  from '../edit-article-page/actions/article-found-in-cache.action';
import { unauthorisedResponse } from '../edit-article-page/actions/unauthorised-response.action';
import { genericError }         from '../edit-article-page/actions/generic-error.action';

import { selectArticle } from '../edit-article-page/selectors/article.selector';

import {
  UNAUTHORIZED,
  NOT_FOUND,
} from '../status-code.constants';

@Injectable()
export class GetArticleEffects {

  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editArticleRequest),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectArticle, { id : action.id })))
      )),
      switchMap(([action, article]) => {
        if (article) {
          return of(articleFoundInCache({id: action.id}));
        }

        return this.articleService.getArticle(action.id)
          .pipe(
            map((articleJSON) => getArticleResponse({ articleJSON })),
            catchError((error) => {
              if (error.status) {
                if (error.status === UNAUTHORIZED) {
                  const redirectUrl = '/edit-article/' + action.id;

                  return of(unauthorisedResponse({ redirectUrl }))
                } else {
                  return of(genericError({ message: 'Server error occurred' }));
                }
              } else {
                return of(genericError({ message: 'Check your network' }));
              }
            })
          )
      })
    ));

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private store: Store<AppState>,
  ) {}
}

