import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, mergeMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../model';

import { ArticleService } from '../article.service';

import { saveArticle } from '../edit-article-page/actions/save-article.action';
import { articleSavedResponse } from '../edit-article-page/actions/article-saved-response.action';
import { genericError } from '../edit-article-page/actions/generic-error.action';
import { unauthorisedResponse } from '../edit-article-page/actions/unauthorised-response.action';

import { selectArticleUnderEditWithToken } from '../edit-article-page/selectors/article.selector';
import { UNAUTHORIZED } from '../status-code.constants';

@Injectable()
export class SaveArticleEffects {

  saveArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveArticle),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectArticleUnderEditWithToken)))
      )),
      mergeMap(([action, article]) => {
        return this.articleService.updateArticle(article.article, article.token)
          .pipe(
            map(() => (articleSavedResponse({ articleJSON : article.article }))),
            catchError((error) => {
              if (error.status) {
                if (error.status === UNAUTHORIZED) {
                  const redirectUrl = '/edit-article/' + article.article.id;

                  return of(unauthorisedResponse({ redirectUrl }));
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

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private store: Store<AppState>,
  ) {}
}

