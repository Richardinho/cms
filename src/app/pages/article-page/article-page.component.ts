//  Angular
import { Component, OnInit, OnDestroy } from '@angular/core';

//  RXJS
import { Store, select } from '@ngrx/store';

//  models
import { AppState } from '../../model';

//  selectors
import { selectArticleLinks } from '../../selectors/select-article-links';

//  actions
import { createArticleRequest, requestArticleLinks } from '../../actions/';

// TODO: change name to ArticleLinksPageComponent
@Component({
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent implements OnInit {
  // TODO: give this a type
  articles$: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(requestArticleLinks());

    this.articles$ = this.store.pipe(select(selectArticleLinks));
  }

  createArticle() {
    this.store.dispatch(createArticleRequest());
  }
}
