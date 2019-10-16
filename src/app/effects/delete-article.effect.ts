import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { tap, map, mergeMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';

import { ArticleService } from '../article.service';

import { AppState } from '../model';

import { deleteArticle } from '../edit-article-page/actions/delete-article.action';
import { deleteArticleResponse } from '../edit-article-page/actions/delete-article-response.action';
import { unauthorisedResponse } from '../edit-article-page/actions/unauthorised-response.action';

import { selectArticleUnderEditWithToken } from '../edit-article-page/selectors/article.selector';

import {
  UNAUTHORIZED,
  NOT_FOUND,
} from '../status-code.constants';

@Injectable()
export class DeleteArticleEffects {
  redirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArticleResponse),
      tap(() => {
        this.router.navigate(['/']);
      })
    ), { dispatch: false });

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteArticle),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectArticleUnderEditWithToken)))
      )),
      mergeMap(([action, { article, token }]) => {
        if (article) {
          //todo: destructure this
          const id = article.id;

          return this.articleService.deleteArticle(id, token)
            .pipe(
              map(() => (deleteArticleResponse({ id: id }))),
              catchError((error) => {
                if (error.status) {
                  if (error.status === UNAUTHORIZED) {
                    return of(unauthorisedResponse({
                      redirectUrl: action.redirectUrl + article.id
                    }));
                  } else if (error.status === NOT_FOUND) {
                    // this.messageService.show(ARTICLE_MISSING_ERROR_MESSAGE);
                  } else {
                    // this.messageService.show(SERVER_ERROR_MESSAGE);
                  }
                } else {
                  // this.messageService.show(NETWORK_ERROR_MESSAGE);
                }

                return of({ type: '[Edit...] error occurred' });
              })
            );
        } else {
          return of({ type: '[Error] error occurred'});
        }
      })
    )
  );
  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private router: Router,
    private store: Store<AppState>,
  ) {}
}

