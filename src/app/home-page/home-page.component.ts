import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../article';
import { navigateAway } from './actions/navigate-away';
import { requestArticleLinks } from './actions/request-article-links';
import { selectArticleLinks } from './selectors/select-article-links';
import { requestPublishArticle } from './actions/request-publish-article';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  articles$;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(requestArticleLinks());
    this.articles$ = this.store.pipe(select(selectArticleLinks));
  }

  publish(articleId) {
    this.store.dispatch(requestPublishArticle({ id: articleId, publish: true }));
  }

  unpublish(articleId) {
    this.store.dispatch(requestPublishArticle({ id: articleId, publish: false }));
  }

  ngOnDestroy() {
    this.store.dispatch(navigateAway());
  }
}
