import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, concatMap, withLatestFrom } from 'rxjs/operators';
import { ArticleService } from '../article.service';
import { saveArticle } from '../edit-article-page/actions/save-article.action';
import { selectArticleUnderEdit } from '../edit-article-page/selectors/article.selector';
import { articleSavedResponse } from '../edit-article-page/actions/article-saved-response.action';
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
          console.log('merge map', article);
        // broken because of tags
        if (article) {
          debugger;
          return this.articleService.updateArticle(article)
            .pipe(
              map(() => (articleSavedResponse())),
              catchError((error) => {
                if (error.status) {
                  if (error.status === UNAUTHORIZED) {
                    //this.authService.redirectUrl = '/edit-article/' + this.articleId;

                    //this.router.navigate(['/login']);
                  } else if (error.status === NOT_FOUND) {
                    //this.messageService.show(ARTICLE_MISSING_ERROR_MESSAGE);
                  } else {
                    //this.messageService.show(SERVER_ERROR_MESSAGE);
                  }
                } else {
                  //this.messageService.show(NETWORK_ERROR_MESSAGE);
                }


                return of({ type: '[Edit...] error occurred' })
              })
            )
        } else {
          return of({ type: '[Error] error occurred'}) 
        }
      })
    )
  );
  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private store: Store<AppState>,
  ) {}
}

