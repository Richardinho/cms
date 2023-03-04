import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../model';

//import { navigateAway } from './actions/navigate-away';

import { selectArticleLinks } from '../../selectors/select-article-links';

import { requestArticleLinks } from '../../actions/request-article-links';
import { createArticleRequest } from '../../actions/create-article.action';

// change name to ArticleLinksPageComponent
@Component({
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent implements OnInit {
  articles$: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(requestArticleLinks());

    this.articles$ = this.store.pipe(select(selectArticleLinks));
  }

  createArticle() {
    const action = createArticleRequest();
    this.store.dispatch(action);
  }
}
