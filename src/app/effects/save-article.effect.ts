import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { tap, map, mergeMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { saveArticle } from '../edit-article-page/actions/save-article.action';
import { selectArticleUnderEdit } from '../edit-article-page/selectors/article.selector';
import { articleSavedResponse } from '../edit-article-page/actions/article-saved-response.action';
import { unauthorisedResponse } from '../edit-article-page/actions/unauthorised-response.action';
import { genericError } from '../edit-article-page/actions/generic-error.action';
import { AppState } from '../article';
import { Store, select } from '@ngrx/store';
import {
  UNAUTHORIZED,
  NOT_FOUND,
} from '../status-code.constants';

@Injectable()
export class SaveArticleEffects {

  saveArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveArticle),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectArticleUnderEdit)))
      )),
      mergeMap(([action, article]) => {
        return this.articleService.updateArticle(article)
          .pipe(
            map(() => (articleSavedResponse({ articleJSON : article }))),
            catchError((error) => {
              if (error.status) {
                if (error.status === UNAUTHORIZED) {
                  const redirectUrl = '/edit-article/' + article.id;

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

