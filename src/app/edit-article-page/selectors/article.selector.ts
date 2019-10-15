import { createSelector, State } from '@ngrx/store';
import { AppState, Articles } from '../../article';

export const selectArticles = (state: AppState) => state.articles;

export const selectId = (state: AppState) => {
  if (state && state.ui && state.ui.id_of_article_under_edit ) {
    return state.ui.id_of_article_under_edit;
  } else {
    return '';
  }
};

export const selectArticleUnderEdit = createSelector(
  selectArticles,
  selectId,
  (articles: Articles, id: string) => {
     return articles[id];
  }
);

export const selectArticle = createSelector(
  selectArticles,
  (articles: Articles, props) => articles[props.id]
);

