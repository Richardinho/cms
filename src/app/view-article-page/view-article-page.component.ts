import { ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleService } from '../article.service';
import { Store, select, createSelector, State } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { switchMap, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AppState, Article } from '../article';
import { Router } from '@angular/router';
import { selectArticleUnderEdit } from '../edit-article-page/selectors/article.selector';
import { AuthService } from '../auth/auth.service';
import { DialogService } from '../auth/dialog.service';
import { articleRequest } from '../edit-article-page/actions/edit-article-request.action';
import { navigateToEditPageRequest } from './actions/navigate-to-edit-page-request';
import { deleteArticleRequest } from './actions/delete-article-request';

const CONFIRMATION_MESSAGE = 'Are you sure that you want to delete this article?';
@Component({
  selector: 'app-view-article-page',
  templateUrl: './view-article-page.component.html',
  styleUrls: ['./view-article-page.component.scss']
})
export class ViewArticlePageComponent implements OnInit {
  article$: Observable<Article>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private articleService: ArticleService,
    private dialogService: DialogService,
    private store: Store<AppState>
  ) {}


  ngOnInit() {

    this.article$ = this.store.pipe(select(selectArticleUnderEdit));

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');

      this.store.dispatch(articleRequest({
        id,
        redirectUrl: '/view-article/' + id }));
    });
  }

  editArticle() {
    this.store.dispatch(navigateToEditPageRequest());
  }

  deleteArticle() {
    this.store.dispatch(deleteArticleRequest());
    /*
    function handleSuccess() {
      this.router.navigate(['/home']);
    }

    function handleError(error) {
      console.log('error', error);
    }

    this.dialogService.confirm(CONFIRMATION_MESSAGE)
      .subscribe((canDelete) => {
        if (canDelete) {
          this.articleService
            .deleteArticle('')
            .subscribe(handleSuccess.bind(this), handleError);

        ,
      });
     */
  }
}
