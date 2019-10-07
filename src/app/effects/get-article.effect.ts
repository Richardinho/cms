import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, switchMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { editArticleRequest } from '../edit-article-page/actions/edit-article-request.action';
import { getArticleResponse } from '../edit-article-page/actions/get-article-response.action';
import { AppState } from '../article';
import { Store, select } from '@ngrx/store';
import {
  UNAUTHORIZED,
  NOT_FOUND,
} from '../status-code.constants';

@Injectable()
export class GetArticleEffects {

  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editArticleRequest),
      switchMap(action => {
        return this.articleService.getArticle(action.id)
          .pipe(
            map((articleJSON) => getArticleResponse({ articleJSON })),
            catchError(error => {
              return of({ type: '[Error] error blah'});
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

