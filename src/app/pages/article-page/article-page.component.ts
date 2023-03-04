import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../model';

//import { navigateAway } from './actions/navigate-away';

import { selectArticleLinks } from '../../selectors/select-article-links';

import { requestArticleLinks } from '../../actions/request-article-links';
import { requestPublishArticle } from '../../actions/request-publish-article';
import { createArticleRequest } from '../../actions/create-article.action';

// change name to ArticleLinksPageComponent
@Component({
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  articles$: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // dispatch action to request links
    this.store.dispatch(requestArticleLinks());

    // configure stream of links from store
    this.articles$ = this.store.pipe(select(selectArticleLinks));
  }

  publish(articleId: any) {
    this.store.dispatch(
      requestPublishArticle({ id: articleId, publish: true })
    );
  }

  unpublish(articleId: any) {
    const metadata = { id: articleId, publish: false };
    const action = requestPublishArticle(metadata);
    this.store.dispatch(action);
  }

  ngOnDestroy() {
    //this.store.dispatch(navigateAway());
  }

  createArticle() {
    const action = createArticleRequest();
    this.store.dispatch(action);
  }
}
