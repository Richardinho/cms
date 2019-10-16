import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, switchMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { AppState } from '../../model';

import { ArticleService } from '../../article.service';

import { unauthorisedResponse } from '../../edit-article-page/actions/unauthorised-response.action';
import { genericError } from '../../edit-article-page/actions/generic-error.action';

import { articleLinksResponse } from '../actions/article-links-response';
import { requestArticleLinks } from '../actions/request-article-links';

import { selectJWTToken } from '../../edit-article-page/selectors/article.selector';

import {
  UNAUTHORIZED,
  NOT_FOUND,
} from '../../status-code.constants';

@Injectable()
export class LoadArticleLinksEffects {

  loadArticleLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestArticleLinks),
      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(selectJWTToken)))
      )),
      switchMap(([action, token]) => {
        if(token) {
          return this.articleService.getArticles(token)
            .pipe(
              map((articleLinks) => articleLinksResponse({ articleLinks })),
              catchError((error) => {
                if (error.status) {
                  if (error.status === UNAUTHORIZED) {
                    return of(unauthorisedResponse({ redirectUrl: '/' }));
                  } else {
                    return of(genericError({ message: 'Server error occurred' }));
                  }
                } else {
                  return of(genericError({ message: 'Check your network' }));
                }
              })
            );
        } else {

          /*
           *  on start up, the token will be empty so need to immediately redirect to home page
           */

          return of(unauthorisedResponse({ redirectUrl: '/' }));
        }
      })
    ));

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private store: Store<AppState>,
  ) {}
}

