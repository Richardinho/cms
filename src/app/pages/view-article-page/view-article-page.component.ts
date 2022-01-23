import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { Store, select, createSelector, State } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';

import { ArticleService } from '../../services/article.service';
import { AppState, Article } from '../../model';
import { selectArticleUnderEdit } from '../../selectors/article.selector';
import { DialogService } from '../../services/dialog.service';

import { articleRequest } from '../../actions/edit-article-request.action';
import { navigateToEditPageRequest } from '../../actions/navigate-to-edit-page-request';
import { deleteArticle } from '../../actions/delete-article.action';

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
    private articleService: ArticleService,
    private dialogService: DialogService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
		// pipe article from store whenever it's updated
    this.article$ = this.store.pipe(select(selectArticleUnderEdit));

		// when route changes, fetch new article
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
    this.dialogService.confirm(CONFIRMATION_MESSAGE)
      .subscribe((canDelete: any) => {
        if (canDelete) {
          this.store.dispatch(deleteArticle({ redirectUrl: '/view-article/'}));
        }});
  }
}